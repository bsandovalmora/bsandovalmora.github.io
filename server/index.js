import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import Button from "@mui/material/Button";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Grid from "@mui/material/Grid";
import ApiIcon from "@mui/icons-material/Api";
import FacebookIcon from "@mui/icons-material/Facebook";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "es",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx("link", {
        rel: "icon",
        href: "/favicon.png"
      }), /* @__PURE__ */ jsx("meta", {
        name: "KEYMACR",
        content: "Servicios contables y asesoría fiscal en Costa Rica."
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const Logo$1 = "/assets/logo3-Dor84YbO.png";
const Ola = "data:image/svg+xml,%3csvg%20id='visual'%20viewBox='0%200%20900%20600'%20width='900'%20height='600'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20version='1.1'%3e%3cpath%20d='M0%20526L12.5%20525.2C25%20524.3%2050%20522.7%2075%20527.5C100%20532.3%20125%20543.7%20150%20544.8C175%20546%20200%20537%20225%20538.3C250%20539.7%20275%20551.3%20300%20551.3C325%20551.3%20350%20539.7%20375%20534.5C400%20529.3%20425%20530.7%20450%20528.5C475%20526.3%20500%20520.7%20525%20521.2C550%20521.7%20575%20528.3%20600%20529.2C625%20530%20650%20525%20675%20521.8C700%20518.7%20725%20517.3%20750%20520.3C775%20523.3%20800%20530.7%20825%20535.3C850%20540%20875%20542%20887.5%20543L900%20544L900%20601L887.5%20601C875%20601%20850%20601%20825%20601C800%20601%20775%20601%20750%20601C725%20601%20700%20601%20675%20601C650%20601%20625%20601%20600%20601C575%20601%20550%20601%20525%20601C500%20601%20475%20601%20450%20601C425%20601%20400%20601%20375%20601C350%20601%20325%20601%20300%20601C275%20601%20250%20601%20225%20601C200%20601%20175%20601%20150%20601C125%20601%20100%20601%2075%20601C50%20601%2025%20601%2012.5%20601L0%20601Z'%20fill='%23ffffff'%20stroke-linecap='round'%20stroke-linejoin='miter'%3e%3c/path%3e%3c/svg%3e";
const Hero = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("header", { className: "hero ", children: /* @__PURE__ */ jsxs("div", { className: "hero-container", children: [
      /* @__PURE__ */ jsx("img", { src: Logo$1, alt: "KEYMA CR Logo", className: "hero-logo" }),
      /* @__PURE__ */ jsx("h1", { children: "Solucíon contable y tributaria" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Soluciones contables que te dan claridad, confianza y control.",
        " ",
        /* @__PURE__ */ jsx("br", {}),
        "Somos tu mejor aliado que impulsa tu crecimiento con tranquilidad, ",
        /* @__PURE__ */ jsx("br", {}),
        "Tu tranquilidad financiera empieza aquí.",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("br", {}),
        "Correo: info@keymacr.es"
      ] }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          className: "btn btn-success",
          variant: "contained",
          target: "_blank",
          href: "https://wa.me/50684466551?text=Hola%20Quiero%20más%20información",
          children: [
            /* @__PURE__ */ jsx(WhatsAppIcon, { style: { marginRight: "8px" } }),
            "Contáctanos - 8446 6551"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("img", { src: Ola, alt: "KEYMA CR Logo", className: "hero-ola" })
  ] });
};
const ImgActividades = "/assets/actividades-DyvOtwsN.png";
const ImgDeudas = "/assets/deudas-yErGbsee.png";
const ImgContabilidad = "/assets/Contabilidad-DKtjfpJh.png";
const ImgFinanciero = "/assets/financiero-C-j6otwW.png";
const ImgHacienda = "/assets/hacienda-BK1-qxvX.png";
const ImgCpi = "/assets/cpi-CF8jAnRC.png";
const ImgFlujo = "/assets/flujo-3lJg8zg2.png";
const ImgPlanillas = "/assets/planillas-6Tps9FdZ.png";
const Services = () => {
  return /* @__PURE__ */ jsxs(Grid, { container: true, mt: 3, padding: 5, spacing: 2, children: [
    /* @__PURE__ */ jsxs(Grid, { size: 12, children: [
      /* @__PURE__ */ jsx("p", { className: "subtitle-services", children: "¿Qué ofrecemos?" }),
      /* @__PURE__ */ jsx("h2", { className: "title-services", children: "Nuestros Servicios" })
    ] }),
    /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: /* @__PURE__ */ jsxs("div", { className: "card-service", children: [
      /* @__PURE__ */ jsx("img", { src: ImgActividades, alt: "Service 1" }),
      /* @__PURE__ */ jsx("h3", { children: "Inscripción y desinscripción de Actividades" })
    ] }) }),
    /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: /* @__PURE__ */ jsxs("div", { className: "card-service", children: [
      /* @__PURE__ */ jsx("img", { src: ImgDeudas, alt: "Service 1" }),
      /* @__PURE__ */ jsx("h3", { children: "Prescripción de deudas" })
    ] }) }),
    /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: /* @__PURE__ */ jsxs("div", { className: "card-service", children: [
      /* @__PURE__ */ jsx("img", { src: ImgContabilidad, alt: "Service 1" }),
      /* @__PURE__ */ jsx("h3", { children: "Contabilidad Outsourcing" })
    ] }) }),
    /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: /* @__PURE__ */ jsxs("div", { className: "card-service", children: [
      /* @__PURE__ */ jsx("img", { src: ImgFinanciero, alt: "Service 1" }),
      /* @__PURE__ */ jsx("h3", { children: "Estados Financieros para Entidades Bancarias" })
    ] }) }),
    /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: /* @__PURE__ */ jsxs("div", { className: "card-service", children: [
      /* @__PURE__ */ jsx("img", { src: ImgCpi, alt: "Service 1" }),
      /* @__PURE__ */ jsx("h3", { children: "Certificación de Ingresos bajo CPI" })
    ] }) }),
    /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: /* @__PURE__ */ jsxs("div", { className: "card-service", children: [
      /* @__PURE__ */ jsx("img", { src: ImgFlujo, alt: "Service 1" }),
      /* @__PURE__ */ jsx("h3", { children: "Preparación de Flujos de Caja Proyectados" })
    ] }) }),
    /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: /* @__PURE__ */ jsxs("div", { className: "card-service", children: [
      /* @__PURE__ */ jsx("img", { src: ImgPlanillas, alt: "Service 1" }),
      /* @__PURE__ */ jsx("h3", { children: "Preparación y presentación de planillas CCSS/ INS" })
    ] }) }),
    /* @__PURE__ */ jsx(Grid, { size: { xs: 12, sm: 6, md: 3 }, children: /* @__PURE__ */ jsxs("div", { className: "card-service", children: [
      /* @__PURE__ */ jsx("img", { src: ImgHacienda, alt: "Service 1" }),
      /* @__PURE__ */ jsx("h3", { children: "Preparación y presentación de declaraciones ante el Ministerio de Hacienda" })
    ] }) })
  ] });
};
const ImgExperiencia = "/assets/experiencia-Do_Yzd8C.png";
const ImgAsesoramiento = "/assets/asesoramiento-DOVLxmJM.png";
const ImgDecisiones = "/assets/decisiones-BBWmSPnu.png";
const About = () => {
  return /* @__PURE__ */ jsx("section", { className: "about-section", children: /* @__PURE__ */ jsxs(
    Grid,
    {
      container: true,
      direction: "row",
      sx: { justifyContent: "flex-end", alignItems: "center" },
      padding: 5,
      spacing: 2,
      children: [
        /* @__PURE__ */ jsx(Grid, { size: 12, children: /* @__PURE__ */ jsx("div", { className: "about-img", children: /* @__PURE__ */ jsx("h1", { className: "p-5", children: "¿Por qué elegirnos?" }) }) }),
        /* @__PURE__ */ jsx(Grid, { size: { xs: 12, md: 3 }, children: /* @__PURE__ */ jsxs("div", { className: "about-card", children: [
          /* @__PURE__ */ jsxs("h3", { children: [
            " ",
            /* @__PURE__ */ jsx(ApiIcon, { color: "primary" }),
            " Experiencia y conocimiento"
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Contamos con una amplia experiencia en el campo de la contabilidad y podemos ayudarle a mantenerse al día con sus obligaciones fiscales y financieras." }),
          /* @__PURE__ */ jsx("img", { src: ImgExperiencia, alt: "Experiencia" })
        ] }) }),
        /* @__PURE__ */ jsx(Grid, { size: { xs: 12, md: 3 }, children: /* @__PURE__ */ jsxs("div", { className: "about-card", children: [
          /* @__PURE__ */ jsxs("h3", { children: [
            /* @__PURE__ */ jsx(ApiIcon, { color: "primary" }),
            " Asesoramiento personalizado"
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Nuestro enfoque es personalizado para cada cliente, lo que significa que pueden adaptar sus servicios para satisfacer las necesidades específicas de cada empresa." }),
          /* @__PURE__ */ jsx("img", { src: ImgAsesoramiento, alt: "Asesoramiento" })
        ] }) }),
        "s",
        /* @__PURE__ */ jsx(Grid, { size: { xs: 12, md: 3 }, children: /* @__PURE__ */ jsxs("div", { className: "about-card", children: [
          /* @__PURE__ */ jsxs("h3", { children: [
            /* @__PURE__ */ jsx(ApiIcon, { color: "primary" }),
            " Decisiones empresariales"
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Al tener información financiera precisa y confiable, las empresas pueden tomar decisiones empresariales más informadas y estratégicas para el futuro de su negocio." }),
          /* @__PURE__ */ jsx("img", { src: ImgDecisiones, alt: "Decisiones" })
        ] }) })
      ]
    }
  ) });
};
const Logo = "/assets/logo-D9VOK9zU.png";
const AboutUs = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("section", { className: "about-us-section", children: /* @__PURE__ */ jsxs(
    Grid,
    {
      container: true,
      direction: "row",
      spacing: 2,
      padding: 5,
      justifyContent: "center",
      children: [
        /* @__PURE__ */ jsx(Grid, { size: 12, justifyContent: "center", children: /* @__PURE__ */ jsx("h6", { className: "p-5", children: "¿Quienes somos?" }) }),
        /* @__PURE__ */ jsxs(Grid, { size: { md: 10, sm: 12 }, children: [
          /* @__PURE__ */ jsx("h3", { children: "Somos una empresa Familiar que presta servicios de contabilidad, recursos humanos, y asesoramiento fiscal." }),
          /* @__PURE__ */ jsx("p", { className: "mt-5", children: "Somos el mejor aliado para toda aquella persona física o jurídica que se encuentra inscrita en el misterio de Hacienda, prestamos servicios tanto a las Micro, pequeñas y medianas empresas, comerciales y de servicio que funcionan en diferentes sectores del mercado." })
        ] }),
        /* @__PURE__ */ jsx(Grid, { size: { md: 3, sm: 6 }, children: /* @__PURE__ */ jsxs("div", { className: "about-us-card border-shadow-secondary", children: [
          /* @__PURE__ */ jsx("h3", { children: "Transparencia" }),
          /* @__PURE__ */ jsx("p", { children: "Logramos un buen desempeño laboral a través de nuestro compromiso de trabajar con integridad y transparencia para garantizar la justicia, mejorar la confianza, la credibilidad, la responsabilidad y tomar decisiones transparentes con la información financiera de la empresa." })
        ] }) }),
        /* @__PURE__ */ jsx(Grid, { size: { md: 3, sm: 6 }, children: /* @__PURE__ */ jsxs("div", { className: "about-us-card border-shadow-primary", children: [
          /* @__PURE__ */ jsx("h3", { children: "Competitividad" }),
          /* @__PURE__ */ jsx("p", { children: "Seguimos mejorando el desempeño de nuestro estudio y estamos interesados en la excelencia y anticiparnos al futuro para lograr el primer lugar en todas las áreas de nuestro trabajo" })
        ] }) }),
        /* @__PURE__ */ jsx(Grid, { size: { md: 3, sm: 6 }, children: /* @__PURE__ */ jsxs("div", { className: "about-us-card border-shadow-secondary", children: [
          /* @__PURE__ */ jsx("h3", { children: "Innovación" }),
          /* @__PURE__ */ jsx("p", { children: "Buscamos transformar la innovación en trabajo de las empresas mediante el establecimiento de un entorno que estimule el pensamiento creativo y la construcción de personas con altas habilidades de innovación." })
        ] }) }),
        /* @__PURE__ */ jsx(Grid, { size: { md: 3, sm: 6 }, children: /* @__PURE__ */ jsxs("div", { className: "about-us-card border-shadow-primary", children: [
          /* @__PURE__ */ jsx("h3", { children: "Confianza" }),
          /* @__PURE__ */ jsx("p", { children: "Creemos en nuestra capacidad como personas, como empresa y como país" })
        ] }) })
      ]
    }
  ) }) });
};
const Footer = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("footer", { className: "footer", children: /* @__PURE__ */ jsx("div", { className: "footer-content", children: /* @__PURE__ */ jsxs(Grid, { container: true, direction: "row", spacing: 2, children: [
    /* @__PURE__ */ jsxs(Grid, { size: { xs: 6, sm: 6, md: 8 }, children: [
      /* @__PURE__ */ jsx("img", { src: Logo, alt: "logo" }),
      /* @__PURE__ */ jsx("p", { className: "ml-5", children: "Servicios contables y asesoría fiscal en Costa Rica." })
    ] }),
    /* @__PURE__ */ jsxs(Grid, { size: { xs: 6, sm: 6, md: 4 }, children: [
      /* @__PURE__ */ jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsx("h3", { children: "Contacto" }),
        /* @__PURE__ */ jsx("p", { children: "Teléfono: +506 8446 6551" }),
        /* @__PURE__ */ jsx("p", { children: "Email: info@keymacr.es" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "ml-5", children: "Redes sociales" }),
      /* @__PURE__ */ jsx("ul", { className: "socials ml-5", children: /* @__PURE__ */ jsxs("li", { className: "social-icon", children: [
        " ",
        /* @__PURE__ */ jsxs("a", { className: "text-primary ml-5", href: "https://www.facebook.com/keymacr.es", children: [
          " ",
          /* @__PURE__ */ jsx(FacebookIcon, {}),
          "Facebook"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Grid, { size: { xs: 6, sm: 6, md: 4 } })
  ] }) }) }) });
};
function meta({}) {
  return [{
    title: "KEYMA CR"
  }, {
    name: "description",
    content: "KEYMA CR"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Hero, {}), /* @__PURE__ */ jsx(Services, {}), /* @__PURE__ */ jsx(About, {}), /* @__PURE__ */ jsx(AboutUs, {}), /* @__PURE__ */ jsx(Footer, {})]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-9QLc9VcE.js", "imports": ["/assets/chunk-OIYGIGL5-u8IZndoQ.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-DVVXMtyN.js", "imports": ["/assets/chunk-OIYGIGL5-u8IZndoQ.js"], "css": ["/assets/root-B7dqomQV.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-DcCOBQ6w.js", "imports": ["/assets/chunk-OIYGIGL5-u8IZndoQ.js"], "css": ["/assets/home-Dq4pDT-O.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-357e4e8a.js", "version": "357e4e8a", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
