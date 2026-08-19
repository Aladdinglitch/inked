This is an excellent discovery document. It contains enough information to begin designing and developing a premium website. The client's vision is very clear: **a luxurious, modern, high-end tattoo studio website** focused on portfolio presentation, trust, and appointment bookings. The document covers business details, artist biography, branding, booking workflow, target audience, and business goals. 

Based on the information provided, I would refine the project into the following architecture.

# Technology Stack

```
React 19
TypeScript
Vite

Tailwind CSS v4

Framer Motion

React Router

React Hook Form

Zod

TanStack Query

Axios

Lenis

GSAP (Hero animations)

Embla Carousel

React Helmet Async

Lucide React

React Hot Toast

Cloudinary (Portfolio Images)

Supabase (Future Backend)


Calendly API or Custom Booking

Vercel Analytics
```

---

# Website Sitemap

```
Home

About Elizabeth

Portfolio

Tattoo Styles

Piercings

Booking

Aftercare

Testimonials

FAQ

Contact
```

---

# Complete Folder Structure

```text
src

├── app
│   ├── App.tsx
│   ├── main.tsx
│   ├── router.tsx
│   └── providers.tsx
│
├── assets
│   ├── images
│   ├── videos
│   ├── logo
│   ├── svg
│   ├── fonts
│   └── icons
│
├── components
│
│   ├── ui
│   │
│   ├── animations
│   │
│   ├── layout
│   │
│   ├── sections
│   │
│   ├── forms
│   │
│   └── shared
│
├── features
│
│   ├── home
│   ├── gallery
│   ├── booking
│   ├── aftercare
│   ├── contact
│   ├── reviews
│   └── faq
│
├── pages
│
│   ├── Home
│   ├── About
│   ├── Gallery
│   ├── Services
│   ├── Booking
│   ├── Aftercare
│   ├── FAQ
│   ├── Contact
│   └── NotFound
│
├── services
│
├── hooks
│
├── utils
│
├── lib
│
├── store
│
├── types
│
├── constants
│
├── styles
│
└── data
```

---

# Home Page Structure

```
Loading Screen

Navigation

Hero Section

Featured Tattoo Styles

Portfolio Preview

Meet Elizabeth

Why Choose Inked Attraction

Tattoo Process

Booking CTA

Testimonials

Instagram Feed

FAQ Preview

Footer
```

---

# Hero Section

The hero should immediately communicate the brand's luxury feel.

```
Fullscreen Background Video

Dark Overlay

Animated Heading

"Where Art Meets Precision"

Luxury Gold Accent

Book Appointment Button

View Portfolio Button

Floating Mouse Indicator
```

---

# Portfolio Section

Since the client can provide **20 professional images and videos**, this should become the centerpiece of the website. 

### Categories

```
Fine Line

Portrait

Tribal

Black & Grey

Scar Cover-up

Piercings
```

Each portfolio item should include:

```
Image

Tattoo Style

Location

Description

Zoom

Lightbox

Before/After (optional)
```

---

# About Section

Derived from the artist's biography.

```
Portrait

Biography

Mission

Experience

Years of Experience

Studio Values

Professional Hygiene

Precision

Creativity

Client Care
```

The copy should emphasize the studio's commitment to meaningful artwork, attention to detail, hygiene, and personalized experiences, as described in the discovery form. 

---

# Services

### Tattoos

```
Fine Line

Portrait

Tribal

Custom Tattoos

Scar Cover-up

Black & Grey
```

### Piercings

```
Ear

Nose

Lip

Eyebrow

Navel

Industrial

Custom Consultation
```

These offerings come directly from the client's listed specialties. 

---

# Booking Flow

The booking experience should be a multi-step wizard.

```
Step 1

Personal Information

Name

Phone

Email

WhatsApp

---

Step 2

Tattoo or Piercing

Service

Preferred Date

Preferred Time

Budget

Placement

Size

Colour

Description

---

Step 3

Reference Images

Upload Images

Maximum 5 Files

---

Step 4

Deposit

Display Policy

50% Deposit

Terms

Submit
```

This flow matches the client's booking policy, including the 50% non-refundable deposit, consultation details, and preparation instructions. 

---

# Aftercare Page

```
Before Appointment

Healing

Cleaning

Moisturizing

Do's

Don'ts

FAQs

Emergency Contact
```

---

# Testimonials

```
Google Reviews

Instagram Reviews

Cards

Carousel

Video Reviews
```

---

# Contact

```
Google Maps

Business Hours

Phone

WhatsApp

Instagram

Facebook

TikTok

Email

Contact Form
```

The discovery form includes the studio's business hours, social platforms, and preferred communication method, which should all be surfaced here. 

---

# Premium Animations

```
Page Transitions

Smooth Scroll

Image Reveal

Scroll Progress

Parallax

Mouse Glow

Text Reveal

Glass Blur

Hover Tilt

Hero Zoom

Animated Counters

Floating Cards
```

---

# Color Palette

Following the client's branding preferences:

```
Primary

#000000

Secondary

#C8A54B

Accent

#FFFFFF

Neutral

#1A1A1A

Background

#0D0D0D

Glass

rgba(255,255,255,.08)
```

This reflects the requested **black, gold, and white** palette with a **modern and luxurious** aesthetic. 

---

# Typography

```
Headings

Cinzel

or

Cormorant Garamond

Body

Inter

Buttons

Poppins
```

---

# SEO Pages

```
Home

About

Portfolio

Tattoo Styles

Piercings

Booking

Tattoo Aftercare

Contact

FAQ
```

---

# Future Admin Dashboard

Although not needed for the MVP, design the architecture so it can later support:

```
Dashboard

Bookings

Clients

Gallery

Reviews

Blog

Messages

Analytics

Content Management
```

---

## Development Roadmap

### Phase 1

* Initialize the React + TypeScript project
* Configure Tailwind CSS and Framer Motion
* Set up routing, theme, and reusable UI components
* Build the global layout (Navbar, Footer, page transitions)

### Phase 2

* Build Home, About, Services, Gallery, Booking, Aftercare, FAQ, and Contact pages
* Integrate animations and responsive layouts
* Populate pages with the content from the discovery form

### Phase 3

* Implement the multi-step booking form with validation
* Add portfolio filtering, lightbox, and media optimization
* Integrate contact forms, social links, and testimonials

### Phase 4

* Optimize SEO, accessibility, and performance
* Add analytics and deployment configuration
* Prepare hooks and services for future Supabase integration

This structure closely aligns with the client's stated goals of showcasing a premium portfolio, making booking seamless, highlighting professionalism and hygiene, educating clients through aftercare content, and establishing Inked Attraction as a trusted destination for high-quality tattoos and piercings. 
