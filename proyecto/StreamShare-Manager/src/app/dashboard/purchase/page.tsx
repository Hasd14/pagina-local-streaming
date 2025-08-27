import { streamingServices, paymentMethods } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Upload } from "lucide-react";

export default function PurchasePage() {
    return (
        <div>
            <h1 className="text-3xl font-bold font-headline mb-6">Purchase a New Subscription</h1>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {streamingServices.map((service) => (
                    <Card key={service.id}>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <service.logo className="w-12 h-12" />
                            <div>
                                <CardTitle className="font-headline text-2xl">{service.name}</CardTitle>
                                <CardDescription>{service.description}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold mb-4">${service.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                            <Button className="w-full">
                                <CreditCard className="mr-2 h-4 w-4" />
                                Proceed to Payment
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-12">
                 <h2 className="text-2xl font-bold font-headline mb-4">Payment Process</h2>
                 <Card>
                    <CardContent className="pt-6">
                        <Tabs defaultValue="pago-movil">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="pago-movil">Pago Móvil</TabsTrigger>
                                <TabsTrigger value="zelle">Zelle</TabsTrigger>
                                <TabsTrigger value="binance">Binance</TabsTrigger>
                            </TabsList>
                            <TabsContent value="pago-movil" className="mt-4">
                                <p className="text-muted-foreground mb-2">Realiza el pago a los siguientes datos y sube el comprobante.</p>
                                <p><span className="font-semibold">Banco:</span> Banesco</p>
                                <p><span className="font-semibold">CI:</span> V-12.345.678</p>
                                <p><span className="font-semibold">Teléfono:</span> 0414-1234567</p>
                            </TabsContent>
                            <TabsContent value="zelle" className="mt-4">
                               <p className="text-muted-foreground mb-2">Realiza el pago a los siguientes datos y sube el comprobante.</p>
                               <p><span className="font-semibold">Correo:</span> payments@streamshare.com</p>
                               <p><span className="font-semibold">Nombre:</span> StreamShare LLC</p>
                            </TabsContent>
                            <TabsContent value="binance" className="mt-4">
                                <p className="text-muted-foreground mb-2">Realiza el pago a los siguientes datos y sube el comprobante.</p>
                               <p><span className="font-semibold">Pay ID:</span> 123456789</p>
                            </TabsContent>
                        </Tabs>

                        <div className="mt-6">
                            <label htmlFor="payment-proof" className="block text-sm font-medium text-gray-700 mb-2">Upload Payment Proof</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>

                         <Button size="lg" className="w-full mt-6">Submit Payment</Button>
                    </CardContent>
                 </Card>
            </div>
        </div>
    )
}
