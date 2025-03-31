<a href="https://ai-lead-scoring.vercel.app/">
  <h1 align="center">AI Lead Scoring Dashboard</h1>
</a>

<p align="center">
 Un panel moderno de análisis y gestión de leads con IA y Supabase
</p>

<p align="center">
  <a href="#features"><strong>Características</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#deploy-to-vercel"><strong>Desplegar en Vercel</strong></a> ·
  <a href="#clonar-y-ejecutar-localmente"><strong>Clonar y ejecutar localmente</strong></a> ·
  <a href="#feedback"><strong>Feedback</strong></a>
</p>
<br/>

## Características

- Dashboard visual con métricas clave (KPIs)
- Registro de leads con campos personalizados y datos de segmentación
- Captura automática de parámetros UTM (utm_source, utm_medium, etc.)
- Lead scoring inteligente (integración con IA en progreso)
- Funciona con la arquitectura completa de [Next.js](https://nextjs.org):
  - App Router + Client Components + Server Components
- Autenticación de usuarios con Supabase
- UI moderna con [Tailwind CSS](https://tailwindcss.com) y [shadcn/ui](https://ui.shadcn.com)

## Demo

Puedes ver la app en vivo en: [ai-lead-scoring.vercel.app](https://ai-lead-scoring.vercel.app)

## Desplegar en Vercel

Haz clic aquí para desplegar tu propia instancia y conectar con Supabase automáticamente:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftuusuario%2Fai-lead-scoring&project-name=ai-lead-scoring&repository-name=ai-lead-scoring)

## Clonar y ejecutar localmente

1. Crea un proyecto en [Supabase](https://database.new)

2. Clona este repositorio:

```bash
git clone https://github.com/tuusuario/ai-lead-scoring.git
cd ai-lead-scoring
```

3. Renombra `.env.example` a `.env.local` y completa las variables:

```
NEXT_PUBLIC_SUPABASE_URL=TU_URL_SUPABASE
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_ANON_KEY
```

4. Ejecuta el servidor local:

```bash
npm install
npm run dev
```

Abre [localhost:3000](http://localhost:3000) para ver el panel.

## Feedback

¿Tienes sugerencias o encontraste algún bug? Abre un issue aquí:
[github.com/tuusuario/ai-lead-scoring/issues](https://github.com/tuusuario/ai-lead-scoring/issues)

## Próximas funcionalidades

- 🧠 Integración con OpenAI para generar puntuación automática de leads
- 📊 Filtros y gráficos para segmentar leads
- 📨 Integración con herramientas externas como Google Ads o HubSpot

## Créditos

Basado en el Starter Kit oficial de [Next.js + Supabase](https://github.com/vercel/next.js/tree/canary/examples/with-supabase)
