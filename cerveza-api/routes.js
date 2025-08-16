const express = require("express");
const router = express.Router();
const db = require("./pg-con-master");
const jwt = require("jsonwebtoken");
const mercadopago = require("mercadopago");
const { preferences } = require("mercadopago");

router.get("/products", (req, res) => {
  db.any(
    "SELECT * FROM cervezas WHERE active_producto IS TRUE and stock > 0 ORDER BY id_producto ASC"
  ).then((resp) => {
    res.send(resp);
  });
});

router.post("/login", async (req, res) => {
  const userExists = await db.any(
    "SELECT user_id, user_name, role FROM public.user u WHERE u.user_name = $1 AND active is true",
    req.body.userName
  );
  //SI EL USUARIO NO EXISTE ENVIAR UN ERROR
  if (!userExists.length) return res.send({error: true});

  const passEqual = await db.any(
    "SELECT user_name FROM public.user u WHERE u.user_name = $1 AND u.password = $2 AND active is true",
    [req.body.userName, req.body.password]
  );

  //CHECKEAR SI LA CONTRASEÑA INGRESADA ES LA MISMA QUE LA DE LA BASE DE DATOS
  if (!passEqual.length) return res.send({ error: true, msg: "credenciales erroneas" });;
  

  const token = jwt.sign(userExists[0], "CERVEZA2022", { expiresIn: 60 * 60 });
  res.send({ error: false, token: token });
});

mercadopago.configure({
    access_token:
      "APP_USR-6226984411825808-081515-914a6e97918b1ac4ef798175cd3510b6-2631791252",
  });
  

router.post("/payment", async (req, res) => {
  let preference = {
    items: [],
    back_urls: {
      success: "localhost:8081/api/feedback",
      failure: "localhost:8081/api/feedback",
      pending: "localhost:8081/api/feedback",
    },
    
      
    // back_urls: {
    //   success: "https://backend-dot-cerveza-365502.uc.r.appspot.com/api/feedback",
    //   failure: "https://backend-dot-cerveza-365502.uc.r.appspot.com/api/feedback",
    //   pending: "https://backend-dot-cerveza-365502.uc.r.appspot.com/api/feedback",
    // },
  };
  console.log(preference);

  let total = 0;
  req.body.products.map((product) => {
    preference.items.push({
      title: product.name,
      unit_price: parseInt(product.price),
      quantity: product.cant,
    });
    total += product.price * product.cant;
  });

  await mercadopago.preferences
    .create(preference)
    .then(async function (response) {
      global.id = response.body.id;

      let init_point = response.body.init_point;

      const insertResponse = await db.any(
        "INSERT INTO pedido(id_user, id_order, fecha_pedido, total_pedido) VALUES($1, $2, $3, $4) RETURNING id_pedido",
        [req.body.userId, response.body.id, new Date(), total]
      );
      req.body.products.map((p) => {
        db.any(
          `INSERT INTO detalle(id_pedido, id_producto, cant_producto) VALUES(${insertResponse[0].id_pedido}, ${p.id}, ${p.cant})`
        );
      });

      req.body.products.map(async (product) => {
        await db.any(
          `UPDATE cervezas  SET stock = stock - ${product.cant} WHERE id_producto = ${product.id}`
        );
      });
      res.send({ init_point: init_point });
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.get("/feedback", async (req, res) => {
  //DESPUES DE PAGAR, ACTUALIZAR EN LA BASE DE DATOS LA ORDEN QUE HA SIDO PAGADA
  // ESTO SE HACE SEGUN EL ID QUE NOS ENTREGA MERCADOPAGO EL CUAL TAMBIEN TENEMOS ALMACENADO AL CREAR LA ORDEN EN PAYMENT 
  await db.any(
    `UPDATE pedido SET pagado = TRUE WHERE id_order = '${req.query.preference_id}'`
  );

  // IF(ORDEN IS NOT PAGADA) RETURN;

  
  //ACTUALIZAR STOCK SEGUN LA ORDEN QUE HA SIDO PAGADA
  //HACEMOS UN SELECT BUSCANDO LA ORDEN (USANDO req.query.preference_id) Y SACAMOS EL ID
  
  
  //CON EL SELECT OBTENEMOS EL ID_ORDER Y BUSCAMOS TODOS LOS DETALLES QUE ESTEN ASOCIADOS A ESA ORDEN

  //CON LAS CANTIDADES DE LOS PRODUCTOS RESTAMOS STOCK HACIENDO UN UPDATE AL STOCK SEGUN SU ID

  // [RESULTADOS DE MI QUERY DONDE SACO LOS PRODCUTOS COMPRADOS].map(async (product) => {
  //     await db.any(
  //       `UPDATE cervezas  SET stock = stock - ${product.cant} WHERE id_producto = ${product.id}`
  //     );
  //   });

  // res.redirect("https://cerveza-365502.uc.r.appspot.com/#/mis-pedidos");
     res.redirect("http://localhost:4200/#/mis-pedidos");
});

router.put("/deshabilitar-cerveza", async (req, res) => {
  await db.any(
    `UPDATE cervezas SET active_producto = false WHERE id_producto = ${req.body.idCerveza}`
  );
  res.send({ error: false });
});

router.put("/editar-cerveza", async (req, res) => {
  await db.any(`UPDATE 
                cervezas 
                SET 
                nombre_producto = '${req.body.nombreProducto}', 
                precio_producto = ${req.body.precioProducto}, 
                stock = ${req.body.stockProducto},
                descripcion_producto = '${req.body.descripcionProducto}',
                img_url = '${req.body.urlImagenProducto}' WHERE id_producto = ${req.body.idProducto}`);
  res.send({ error: false });
});

router.get("/listado-pedidos", async (req, res) => {
  const listadoPedidos = await db.any(
    "SELECT * FROM pedido INNER JOIN user_data ON user_data.id_user = pedido.id_user WHERE pagado=TRUE  "
  );
  res.send({ error: false, result: listadoPedidos });
});

router.get("/mis-pedidos/:id", async (req, res) => {
  const misPedidos = await db.any(
    `SELECT * FROM pedido INNER JOIN user_data ON user_data.id_user = pedido.id_user WHERE pedido.id_user = ${req.params.id} and pagado=TRUE`
  );
  res.send({ error: false, result: misPedidos });
});

router.get("/detalle-pedidos/:id", async (req, res) => {
  // const detallePedidos = await db.any(`SELECT ARRAY_AGG(id_detalle) FROM detalle WHERE id_pedido = ${req.params.id}`);
  const detallePedidos = await db.any(`select row_to_json(row)
  from (
       SELECT * FROM detalle INNER JOIN cervezas ON cervezas.id_producto = detalle.id_producto  WHERE id_pedido = ${req.params.id}
  ) row`);
  res.send({ error: false, result: detallePedidos });
});

router.post("/registrar-cliente", async (req, res) => {
  const userExists = await db.any(
    `SELECT true FROM public.user WHERE user_name = '${req.body.usuario}'`
  );
  if (userExists.length) {
    res.send({ error: true, msg: "usuario ya existe" });
    return;
  }

  const insertRegister = await db.any(
    "INSERT INTO public.user(user_name, password, email) VALUES ($1, $2, $3) RETURNING user_id",
    [req.body.usuario, req.body.contrasena, req.body.correo]
  );

  const userData = await db.any(
    "INSERT INTO public.user_data(id_user,name,last_name, birthday, address, phone, email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_user_data",
    [
      insertRegister[0].user_id,
      req.body.usuario,
      req.body.apellido,
      req.body.edad,
      req.body.direccion,
      req.body.telefono,
      req.body.correo,
    ]
  );
  res.send({ error: false, msg: 'usuario creado' });
});

router.post("/agregar-cerveza", async (req, res) => {
  const addProduct = await db.any(
    "INSERT INTO public.cervezas (nombre_producto, descripcion_producto, precio_producto, img_url, stock) VALUES ($1, $2, $3, $4, $5) RETURNING id_producto",
    [
      req.body.nombreProductoNuevo,
      req.body.descripcionProductoNuevo,
      req.body.precioProductoNuevo,
      req.body.urlImagenProductoNuevo,
      req.body.stockProductoNuevo,
    ]
  );

  res.send({ error: false, msg: 'producto creado', id:  addProduct[0].id_producto});
});

router.get("/listar-todos",async (req, res) => {
  db.any(
    "SELECT * FROM cervezas WHERE active_producto ORDER BY id_producto ASC"
  ).then((resp) => {
    res.send(resp);
  });
});

module.exports = router