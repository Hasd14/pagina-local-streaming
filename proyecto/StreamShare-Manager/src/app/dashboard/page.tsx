
"use client";

import { userSubscriptions } from "@/lib/data"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Clock, Copy, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function UserDashboardPage() {
    const { toast } = useToast();

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copiado",
            description: "Las credenciales se han copiado al portapapeles.",
        });
    };

    return (
        <div>
            <h1 className="text-3xl font-bold font-headline mb-6">My Accounts</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {userSubscriptions.map(sub => (
                    <Card key={sub.id} className="flex flex-col">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                             <sub.serviceLogo className="w-10 h-10" />
                            <div>
                                <CardTitle className="font-headline text-xl">{sub.serviceName}</CardTitle>
                                <CardDescription>Expires on: {sub.expiryDate}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            {sub.status === 'active' && (
                                <div className="space-y-2 text-sm">
                                    <p className="flex justify-between items-center">
                                        <span>Email/User:</span>
                                        <span className="font-mono bg-muted px-2 py-1 rounded flex items-center gap-2">
                                            {sub.credentials.email}
                                            <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => handleCopy(sub.credentials.email!)}><Copy className="h-3 w-3"/></Button>
                                        </span>
                                    </p>
                                    <p className="flex justify-between items-center">
                                        <span>Password:</span>
                                        <span className="font-mono bg-muted px-2 py-1 rounded flex items-center gap-2">
                                            {sub.credentials.password}
                                             <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => handleCopy(sub.credentials.password!)}><Copy className="h-3 w-3"/></Button>
                                        </span>
                                    </p>
                                    {sub.credentials.profile && (
                                        <p className="flex justify-between items-center">
                                            <span>Profile:</span>
                                            <span className="font-mono bg-muted px-2 py-1 rounded">{sub.credentials.profile}</span>
                                        </p>
                                    )}
                                </div>
                            )}
                             {sub.status === 'pending' && (
                                <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-4 bg-secondary rounded-lg h-full">
                                    <Clock className="w-10 h-10 mb-2"/>
                                    <p className="font-semibold">Payment Received</p>
                                    <p className="text-xs">Your credentials will be available here shortly.</p>
                                </div>
                            )}
                            {sub.status === 'expired' && (
                                <div className="flex flex-col items-center justify-center text-center text-destructive p-4 bg-destructive/10 rounded-lg h-full">
                                    <AlertCircle className="w-10 h-10 mb-2"/>
                                    <p className="font-semibold">Subscription Expired</p>
                                    <Button size="sm" className="mt-4" asChild>
                                        <Link href="/dashboard/purchase">
                                            <RefreshCw className="mr-2 h-4 w-4" />
                                            Renew Now
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                            <Badge variant={sub.status === 'active' ? 'default' : sub.status === 'expired' ? 'destructive' : 'secondary'} className="capitalize flex items-center gap-1">
                                {sub.status === 'active' && <CheckCircle className="h-3 w-3" />}
                                {sub.status === 'pending' && <Clock className="h-3 w-3" />}
                                {sub.status === 'expired' && <AlertCircle className="h-3 w-3" />}
                                {sub.status}
                            </Badge>
                             <Button variant="outline" size="sm"><AlertCircle className="w-4 h-4 mr-2"/>Report a Problem</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
