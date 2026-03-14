import { createFileRoute } from '@tanstack/react-router'
import { SignupForm } from '@/components/signup-form'

export const Route = createFileRoute('/auth/sign-up/')({
  component: SignUpPage,
})

function SignUpPage() {
  return <section className="min-h-screen flex items-center justify-center">
    <SignupForm />
  </section>
}
