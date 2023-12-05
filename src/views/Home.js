import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <header>
        <h1>¡Bienvenido a nuestro innovador portal de gestión de inventario Hites!</h1>
      </header>

      <section>
        <p>En el mundo empresarial actual, la eficiencia y la organización son clave para el éxito. En ese sentido, nos complace presentarte nuestra plataforma diseñada para simplificar y optimizar la gestión del inventario de tu empresa.</p>
      </section>

      <section>
        <h2>¿Qué hace nuestro portal?</h2>
        <p>Nuestro portal es una solución integral que centraliza y almacena los datos del inventario de cada integrante de tu empresa. Ya no tendrás que lidiar con hojas de cálculo desordenadas o sistemas complicados. Hemos creado una interfaz intuitiva y fácil de usar que permite a cada miembro del equipo mantener actualizado su inventario de manera eficiente.</p>
      </section>

      <section>
        <h2>Principales características:</h2>
        <ul>
          <li>Acceso personalizado: Cada miembro de tu equipo tendrá su propio espacio de trabajo personalizado, lo que facilita el seguimiento individualizado de los activos y productos.</li>
          <li>Actualización en tiempo real: Olvídate de las actualizaciones manuales y los informes desactualizados. Nuestra plataforma garantiza que los datos estén siempre al día con la información más reciente.</li>
          <li>Historial de cambios: Registramos cada modificación realizada en el inventario, lo que facilita la identificación de responsables y la revisión de cambios a lo largo del tiempo.</li>
          <li>Notificaciones y alertas: Configura notificaciones automáticas para mantenerse informado sobre niveles bajos de existencias, fechas de vencimiento y otros aspectos críticos de tu inventario.</li>
          <li>Generación de informes: Obtén informes detallados y personalizables sobre el estado actual de tu inventario. Analiza tendencias, identifica áreas de mejora y toma decisiones informadas.</li>
        </ul>
      </section>

      <section>
        <h2>¿Por qué elegir nuestro portal?</h2>
        <ul>
          <li>Eficiencia: Simplificamos el proceso de gestión de inventario para que puedas dedicar más tiempo a lo que realmente importa: hacer crecer tu negocio.</li>
          <li>Colaboración: Fomentamos la colaboración entre los miembros del equipo al proporcionar un espacio compartido donde todos puedan contribuir y acceder a la información necesaria.</li>
          <li>Seguridad: La seguridad de tus datos es nuestra prioridad. Utilizamos las últimas tecnologías de cifrado y garantizamos la confidencialidad de la información almacenada.</li>
          <li>Escalabilidad: Nuestra plataforma es escalable, lo que significa que crecerá contigo a medida que tu empresa se expanda.</li>
        </ul>
      </section>

      <footer>
        <p>Optimiza la gestión de tu inventario y lleva tu empresa al siguiente nivel con nuestro portal. ¡Regístrate hoy y descubre cómo podemos hacer que la gestión de inventario sea más fácil, eficiente y efectiva para tu equipo!</p>
      </footer>
    </div>
  );
}

export default Home;
