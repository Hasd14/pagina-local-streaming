import { ArrowUpRight, CheckCircle, Clock, CreditCard, DollarSign, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { payments, userSubscriptions } from "@/lib/data";
import Link from "next/link";

export default function AdminDashboard() {
  const pendingPayments = payments.filter(p => p.status === 'pending');
  const expiringSoon = userSubscriptions.filter(s => s.status === 'active');

  return (
    <div className="flex flex-col w-full gap-4">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,299.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <CreditCard className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingPayments.length}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting approval
              </p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{expiringSoon.length}</div>
              <p className="text-xs text-muted-foreground">
                In the next 7 days
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>New Payment Notifications</CardTitle>
                <CardDescription>
                  Recent payments that require your approval.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="gap-1 ml-auto">
                <Link href="/admin/payments">
                  View All
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingPayments.slice(0, 5).map(payment => (
                     <TableRow key={payment.id}>
                        <TableCell>
                          <div className="font-medium">{payment.userName}</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            {payment.userId}
                          </div>
                        </TableCell>
                        <TableCell>{payment.serviceName}</TableCell>
                        <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
                         <TableCell className="text-right">
                             <Button size="sm" variant="outline">
                                <CheckCircle className="mr-2 h-4 w-4"/>
                                Process
                             </Button>
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Accounts Expiring Soon</CardTitle>
              <CardDescription>
                Users whose subscriptions are ending in the next 7 days.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8">
              {expiringSoon.slice(0, 5).map(sub => (
                <div key={sub.id} className="flex items-center gap-4">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src={`/avatars/${sub.id}.png`} alt="Avatar" />
                    <AvatarFallback>{sub.serviceName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {sub.serviceName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Expires on {sub.expiryDate}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    <Button size="sm">Notify</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
    </div>
  )
}
