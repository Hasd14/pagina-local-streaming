"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { getDynamicPricingSuggestionAction } from '@/app/actions';
import type { DynamicPricingSuggestionOutput } from '@/ai/flows/dynamic-pricing-suggestions';
import { Loader, Wand2, Lightbulb } from 'lucide-react';
import { streamingServices } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const formSchema = z.object({
  streamingService: z.string().min(1, 'Please select a streaming service.'),
  currentPrice: z.coerce.number().min(0, 'Price must be a positive number.'),
  marketDemand: z.string().min(10, 'Market demand description is too short.'),
  competitorAnalysis: z.string().min(10, 'Competitor analysis is too short.'),
});

type FormValues = z.infer<typeof formSchema>;

export function PricingTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DynamicPricingSuggestionOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      streamingService: '',
      currentPrice: 0,
      marketDemand: '',
      competitorAnalysis: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await getDynamicPricingSuggestionAction(values);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="streamingService"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Streaming Service</FormLabel>
                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {streamingServices.map(service => (
                      <SelectItem key={service.id} value={service.name}>{service.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Price ($)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="marketDemand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Market Demand</FormLabel>
                <FormControl>
                  <Textarea placeholder="e.g., High demand due to new popular series release..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="competitorAnalysis"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Competitor Analysis</FormLabel>
                <FormControl>
                  <Textarea placeholder="e.g., Competitor X raised prices by 10% last month..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
            {loading ? 'Analyzing...' : 'Get Suggestion'}
          </Button>
        </form>
      </Form>

      <div className="flex items-center justify-center">
        {loading && (
            <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <Loader className="w-12 h-12 animate-spin text-primary" />
                <p className="font-semibold">AI is thinking...</p>
                <p className="text-sm text-center">This might take a moment.</p>
            </div>
        )}
        {error && <p className="text-destructive">{error}</p>}
        {result && (
            <Card className="w-full bg-secondary/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline">
                        <Lightbulb className="w-6 h-6 text-accent" />
                        AI-Powered Suggestion
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div>
                        <Label className="text-sm text-muted-foreground">Suggested Price</Label>
                        <p className="text-4xl font-bold text-primary">${result.suggestedPrice.toFixed(2)}</p>
                    </div>
                    <div>
                        <Label className="text-sm text-muted-foreground">Reasoning</Label>
                        <p className="text-sm leading-relaxed">{result.reasoning}</p>
                    </div>
                    <Button className="w-full bg-accent hover:bg-accent/90">Apply this Price</Button>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
