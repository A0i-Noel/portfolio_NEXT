import React, { Suspense } from 'react'
import Hero from '@/features/Hero/Hero'
import Header from './components/layouts/header/Header'

const About      = React.lazy(() => import('@/features/About/About'))
const Experience = React.lazy(() => import('@/features/Experience/Experience'))
const Awards      = React.lazy(() => import('@/features/Awards/Awards'))
const Skills     = React.lazy(() => import('@/features/Skills/Skills'))
const Projects   = React.lazy(() => import('@/features/Projects/Projects'))
const Contact    = React.lazy(() => import('@/features/Contact/Contact'))

function SectionFallback() {
  return <div style={{ minHeight: '50vh' }} aria-hidden="true" />
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}><About /></Suspense>
        <Suspense fallback={<SectionFallback />}><Experience /></Suspense>
        <Suspense fallback={<SectionFallback />}><Awards /></Suspense>
        <Suspense fallback={<SectionFallback />}><Skills /></Suspense>
        <Suspense fallback={<SectionFallback />}><Projects /></Suspense>
        <Suspense fallback={<SectionFallback />}><Contact /></Suspense>
      </main>
    </>
  )
}