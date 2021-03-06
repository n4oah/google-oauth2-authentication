import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	val kotlinVersion = "1.3.41"
	id("org.springframework.boot") version "2.1.7.RELEASE"
	id("io.spring.dependency-management") version "1.0.7.RELEASE"
	kotlin("jvm") version kotlinVersion
	kotlin("plugin.spring") version kotlinVersion
	id("org.jetbrains.kotlin.plugin.jpa") version kotlinVersion
}

group = "co.kr.n4oah.blog"
version = "0.0.1"
java.sourceCompatibility = JavaVersion.VERSION_1_8

val developmentOnly by configurations.creating
configurations {
	runtimeClasspath {
		extendsFrom(developmentOnly)
	}
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	implementation(group="org.springframework.boot", name="spring-boot-starter-data-jpa", version="2.1.7.RELEASE")
	implementation(group="org.springframework.boot", name="spring-boot-starter-security", version="2.1.7.RELEASE")
	implementation(group="org.springframework.boot", name="spring-boot-starter-logging", version="2.1.7.RELEASE")
	implementation(group="org.springframework.boot", name="spring-boot-starter-log4j2", version="2.1.7.RELEASE")
//	implementation(group="org.springframework.security.oauth", name="spring-security-oauth2", version="2.3.6.RELEASE")
	implementation(group="org.springframework.security.oauth.boot", name="spring-security-oauth2-autoconfigure", version="2.1.7.RELEASE")
	implementation(group="org.springframework.security", name="spring-security-oauth2-client", version="5.1.6.RELEASE")
	
	compile(group="org.postgresql", name="postgresql", version="42.2.6")
	
	compileOnly("org.projectlombok:lombok")
	
	runtime(group="org.springframework.boot", name="spring-boot-devtools", version="2.1.7.RELEASE")
	
	annotationProcessor("org.projectlombok:lombok")
	
	testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "1.8"
	}
}
