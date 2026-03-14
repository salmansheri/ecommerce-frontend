import { createFileRoute } from '@tanstack/react-router'
import { SignInForm } from '@/components/sign-in-form'

export const Route = createFileRoute('/auth/sign-in/')({
  component: SignInPage,
})

function SignInPage() {
  return <section className="min-h-screen flex justify-center items-center">
    <SignInForm />
  </section>
}
