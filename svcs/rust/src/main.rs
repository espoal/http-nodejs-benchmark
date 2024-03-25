use actix_web::{web, App, HttpServer, Responder};

async fn index() -> impl Responder {
    "<h1>Hello world from Rust!</h1>"
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().service(
            // prefixes all resources and routes attached to it...
            web::scope("/app")
                // ...so this handles requests for `GET /app/index.html`
                .route("/index", web::get().to(index)),
        )
    })
        .bind(("127.0.0.1", 8050))?
        .run()
        .await
}