package com.github.ziohimself.v_i_btree

import akka.actor.typed.ActorSystem
import akka.http.scaladsl.model.{ContentTypes, HttpEntity}
import akka.http.scaladsl.server.Directives.*
import akka.http.scaladsl.server.Route
import akka.util.Timeout
import scala.concurrent.duration._
import scala.jdk.javaapi.DurationConverters._

class PublicAssetsRoutes()(implicit val system: ActorSystem[_]) {

  // If ask takes more time than this to complete the request is failed
  private implicit val timeout: Timeout = Timeout.create(toJava(5.seconds))


  //#all-routes
  val publicRoutes: Route =
    pathPrefix("public") {
      concat(
        getFromDirectory("src/main/resources/public"),
        getFromDirectory("target/public")
      )
    } ~
    path("favicon.ico") {
      getFromResource("public/favicon.ico")
    } ~
    pathSingleSlash {
      get {
        complete(
          HttpEntity(
            ContentTypes.`text/html(UTF-8)`,
            scala.io.Source.fromResource("public/index.html").mkString
          )
        )
      }
    }
  //#all-routes
}
