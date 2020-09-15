export const environment = {
  production: true,
  wsUrl: 'http://localhost:5000/',
  URI:'http://localhost:5000/'
};

export const cliente = {
  //rutas para metodos crud
  registrarse:'negocio/registrar_usuario',
  registrarNegocio:'negocio/activar_cuenta',
  loguearse:'negocio/iniciar_sesion',
  loguearsePorToken:'negocio/iniciar_sesion_por_token',
  protected:'negocio/protected'
};

export const http_platillo_method = {

  guardarPlatillo:"negocio/crear_platillo",
  guardarBebida:"negocio/crear_bebida",
  modificar:"negocio/modificar_platillo",
  modificarConImagenPlatllo:"negocio/modificar_platillo_con_imagen",
  modificarConImagenBebida:"negocio/modificar_bebida_con_imagen",
  modificarAccesibilidadEstado:"negocio/modificar_estado_accesibilidad",
  eliminar:"negocio/eliminar_platillo",
  obtener:"negocio/obtener_todos_los_platillos/",
  obtenerUnPlatillo:"negocio/obtener_un_platillo",
  obtenerCantidadPlatillos:"negocio/obtener_cantidad_platillos"

}

export const http_pedidos_method = {

  cantidadPedidos:"negocio/obtener_cantidad_pedidos",
  modificarFactura:"negocio/modificar_estado_facturas",
  modificarPedido:"negocio/modificar_estado_pedidos",
  obtenerFacturas:"negocio/obtener_facturas",
  obtenerPedidos:"negocio/obtener_pedidos",
  obtenerNumPedidos:"negocio/obtener_Num_Facturas"

}

export const http_cantidades_method = {
  obtenerPlatillosPedidos:"negocio/obtener_cantidad_pedidos_platillos"
}

export const estadosPedidos = {

  modificarVisto:"visto",
  modificarAceptado:"aceptado",
  modificarProceso:"proceso",
  modificarEnviado:"enviado",
  modificarEntregado:"entregado",
  modificarCancelado:"cancelado"

}

export const http_chat_method = {

  obtenerChats:"chat/get_chat",
  obtenerMensajes:"chat/get_mensajes",
  modificarEstadoChat:"chat/modificar_estado_chat",
  modificarMensajesSinVer:"chat/modificar-mensajes-sin-ver"

}

export const http_placesCr_method = {
  URI:"http://localhost:3000/",
  getProvincias:"get_provincias",
  getCantones:"get_cantones",
  getDitritos:"get_distritos"
}


export const notificaciones = {
  //rutas para las notificacione push
  OneSignalAppid:'de9fdc52-8fbf-44db-8aae-8fe1ead04310',
  RestApiKey:'MDg3ZTU2MDMtNjAxOS00YTdmLTkwOTAtZDBlN2IzN2YwNTVl'
};

export const http_planes = {
  getPlan:'negocio/obtener_plan'
}