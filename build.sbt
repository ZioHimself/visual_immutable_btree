lazy val akkaHttpVersion = "10.6.3"
lazy val akkaVersion    = "2.9.3"

resolvers += "Akka library repository".at("https://repo.akka.io/maven")

// Run in a separate JVM, to make sure sbt waits until all threads have
// finished before returning.
// If you want to keep the application running while executing other
// sbt tasks, consider https://github.com/spray/sbt-revolver/
fork := true

lazy val root = (project in file("."))
  .enablePlugins(SbtWeb)
  .settings(
    inThisBuild(List(
      organization    := "com.github.ziohimself",
      scalaVersion    := "3.3.3"
    )),
    name := "visual_immutable_btree",
    libraryDependencies ++= Seq(
      "com.typesafe.akka" %% "akka-http"                % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-http-spray-json"     % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-actor-typed"         % akkaVersion,
      "com.typesafe.akka" %% "akka-stream"              % akkaVersion,
      "ch.qos.logback"    % "logback-classic"           % "1.2.11",

      "com.typesafe.akka" %% "akka-http-testkit"        % akkaHttpVersion % Test,
      "com.typesafe.akka" %% "akka-actor-testkit-typed" % akkaVersion     % Test,
      "org.scalatest"     %% "scalatest"                % "3.2.12"        % Test
    ),
    // Run Webpack before compiling
    Compile / compile := (Compile / compile dependsOn webpack).value,
    webpack := {
      import sys.process._
      if (sys.props("os.name").toLowerCase.contains("windows")) {
        // Use npm.cmd on Windows
        "npm.cmd run webpack" !
      } else {
        // Use npm on Unix-based systems
        "npm run webpack" !
      }
    }
  )

// Define the webpack task
lazy val webpack = taskKey[Unit]("Run webpack to bundle JavaScript")