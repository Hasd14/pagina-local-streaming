import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PricingTool } from "@/components/admin/PricingTool";

export default function PricingAiPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold font-headline">Dynamic Pricing Suggestions</h1>
                <p className="text-muted-foreground">Use our AI tool to get optimal pricing based on market demand and competitor analysis.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Pricing Analysis</CardTitle>
                    <CardDescription>Fill in the details below to receive a pricing suggestion from our AI strategist.</CardDescription>
                </CardHeader>
                <CardContent>
                    <PricingTool />
                </CardContent>
            </Card>
        </div>
    );
}
