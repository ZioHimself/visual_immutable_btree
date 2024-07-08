package com.github.ziohimself.v_i_btree

import akka.actor.typed.ActorSystem
import akka.http.scaladsl.server.Directives.*
import akka.http.scaladsl.server.Route
import akka.util.Timeout

import scala.concurrent.duration._
import scala.jdk.javaapi.DurationConverters.toJava

//#import-json-formats
//#user-routes-class
class BtreeRoutes()(implicit val system: ActorSystem[_]) {

  // If ask takes more time than this to complete the request is failed
  private implicit val timeout: Timeout = Timeout.create(toJava(5.seconds))


  //#all-routes
  //#users-get-post
  //#users-get-delete
  val btreeRoutes: Route =
    pathPrefix("rest") {
      path("btree") {
        concat(
          //#users-get-delete
          pathEnd {
            concat(
              get {
                ???
              }
            )
          }
        )
      }
    }
  //#all-routes
}
