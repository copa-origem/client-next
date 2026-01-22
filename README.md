# 📢 Alerta Cidadão (Citizen Alert)

![Next.js Badge](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind Badge](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Status Badge](https://img.shields.io/badge/STATUS-ONLINE-brightgreen?style=for-the-badge)

> A Civic Tech platform bridging the gap between communities and local government, enabling real-time reporting of urban issues.

---

## 🔗 Live Demo & Resources

🟢 **Live Application:** [https://alertacidadaoapp.vercel.app/](https://alertacidadaoapp.vercel.app/)  
⚙️ **Backend Repository (NestJS/RabbitMQ):** [GitHub - Backend API](https://github.com/copa-origem/alerta-cidadao-api) *(Check this for the Event-Driven Architecture)*

---

## 📱 About the Project

Alerta Cidadão was born from the need to simplify communication between residents and city hall. Issues like potholes, broken streetlights, or waste accumulation often go unresolved due to the lack of an agile notification channel.

**Key Capabilities:**
1.  **Real-Time Reporting:** Users can register incidents instantly.
2.  **Live Updates:** The map updates automatically via **WebSockets** when new reports are submitted by other users.
3.  **Async PDF Export:** Request a report generation and receive it via WebSocket notification (processed in the background to ensure UI responsiveness).
4.  **Geolocation:** Precise pinning of issues on the Google Maps interface.

## 📸 Screenshots

| Mobile - Home | Mobile - New Report | Desktop - Live Map |
|:---:|:---:|:---:|
| ![Home](./public/home_mobile.jpeg) | ![Form](./public/form_mobile.jpeg) | ![Map](./public/map.jpg) |

## 🛠️ Tech Stack

The frontend was built with a focus on **performance**, **SEO**, and **User Experience**, leveraging the React ecosystem.

- **[Next.js](https://nextjs.org/)** - Production-grade React framework (SSR/SSG).
- **[TypeScript](https://www.typescriptlang.org/)** - Static typing for code reliability.
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS for responsive design.
- **[Google Maps API]** - Interactive map integration.
- **[Socket.io-client]** - Real-time bidirectional communication with the backend.
- **[React Hook Form](https://react-hook-form.com/)** - Performant form validation.
- **[Zod](https://zod.dev/)** - Schema validation.

## ⚙️ Engineering Highlights

- [x] **Real-Time Communication:** Implemented WebSocket listeners to update the UI without page refreshes when the backend pushes new data.
- [x] **Server-Side Rendering (SSR):** Optimized initial load time for better SEO and performance.
- [x] **Responsive Design:** Mobile-first approach ensuring usability across all devices.
- [x] **Secure Integration:** Consumes a robust **NestJS API** secured with JWT and guarded routes.

## 🚀 How to Run Locally

To contribute or test the code on your machine:

1. Clone the repository:
```bash
    git clone https://github.com/copa-origem/client-next.git
```

2. Install dependencies:
```bash
    cd client-next
    npm install
    # or
    yarn install
```

3. Configure Environment Variables:  
Create a .env.local file in the root directory and add your firebase and API keys:  
```bash
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
    NEXT_PUBLIC_API_KEY=your_firebase_api_key
    NEXT_PUBLIC_AUTH_DOMAIN=your_project.firebaseapp.com
    NEXT_PUBLIC_PROJECT_ID=your_project_id
    NEXT_PUBLIC_STORAGE_BUCKET=your_bucket.appspot.com
    NEXT_PUBLIC_MESSAGING_SENDER_ID=your_sender_id
    NEXT_PUBLIC_APP_ID=your_app_id
    # If you are running the backend locally:
    NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

4. Run the development server:
```bash
    npm run dev
```
Open http://localhost:3000 in your browser.

## 🤝 Contribution
This is an open-source Civic Tech project. Suggestions and Pull Requests are welcome to help us create better cities.

1. Fork the project
2. Create a Branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'feat: Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## 💻 Architecture Note
This frontend consumes a Restful API developed in NestJS.
The backend implements an Event-Driven Architecture using RabbitMQ for background processing and WebSockets for real-time feedback.  

Note: The previous express.js MVP backend has been fully deprecated and replaced by the scalable NestJS microservice architecture.  

<div align="center">
    <h3>Built with 💜 for better cities by:</h3>
    <table align="center">
        <tr>
            <td align="center">
                <a href="https://www.linkedin.com/in/rafael-rangel1/">
                <b>Rafael Silva Rangel</b><br>
                (Full Stack & DevOps)
                </a>
            </td>
            <td align="center">
                <b>Daniel Mendonça</b><br>
                (Developer)
            </td>
            <td align="center">
                <b>Rafhael Andrade</b><br>
                (Developer)
            </td>
        </tr>
    </table>
</div>