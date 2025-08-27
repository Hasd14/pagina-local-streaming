import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/shared/Header';
import { streamingServices, paymentMethods } from '@/lib/data';
import { CheckCircle, Zap, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Your Favorite Streaming Services, Simplified.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Get access to Netflix, Disney+, Spotify, and more. We manage the accounts, you just enjoy the content.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="font-semibold">
                    <Link href="/register">Get Started</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="font-semibold">
                    <Link href="#services">View Plans</Link>
                  </Button>
                </div>
              </div>
              <img
                src="https://placehold.co/600x400.png"
                width="600"
                height="400"
                alt="Hero"
                data-ai-hint="people watching television"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Our Streaming Services</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose your favorite service and start watching in minutes. No long-term contracts, cancel anytime.
                </p>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-12">
              {streamingServices.map((service) => (
                <Card key={service.id} className="transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl">
                  <CardHeader className="flex flex-col items-center gap-4">
                    <service.logo className="w-16 h-16" />
                    <CardTitle className="font-headline">{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-4xl font-bold font-headline">${service.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                    <p className="text-xs text-muted-foreground mt-2">{service.description}</p>
                    <Button asChild className="mt-4 w-full font-semibold">
                      <Link href="/register">Subscribe</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">How It Works</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A simple and straightforward process to get you started.
              </p>
            </div>
            <div className="mx-auto w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              <div className="flex flex-col items-center gap-2">
                <div className="bg-primary text-primary-foreground rounded-full p-3">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">1. Sign Up</h3>
                <p className="text-sm text-muted-foreground">Create your account in less than a minute.</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="bg-primary text-primary-foreground rounded-full p-3">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">2. Choose & Pay</h3>
                <p className="text-sm text-muted-foreground">Select your desired streaming plan and pay securely.</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="bg-primary text-primary-foreground rounded-full p-3">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">3. Get Access</h3>
                <p className="text-sm text-muted-foreground">Receive your account credentials instantly and start watching.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Accepted Payment Methods</h2>
              <p className="max-w-[600px] text-muted-foreground">We support a variety of local and international payment options for your convenience.</p>
              <div className="flex flex-wrap justify-center items-center gap-8 pt-4">
                {paymentMethods.map(method => (
                  <div key={method.name} className="flex flex-col items-center gap-2">
                    <method.logo className="h-12 w-12" />
                    <span className="text-sm font-medium">{method.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 StreamShare Manager. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
