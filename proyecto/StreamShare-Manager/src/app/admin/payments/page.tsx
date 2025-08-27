import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { payments } from "@/lib/data"
import { MoreHorizontal, FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PaymentsPage() {
    const renderTableRows = (statusFilter?: 'pending' | 'approved' | 'rejected') => {
        const filteredPayments = statusFilter ? payments.filter(p => p.status === statusFilter) : payments;
        return filteredPayments.map(payment => (
             <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.userName}</TableCell>
                <TableCell>{payment.serviceName}</TableCell>
                <TableCell className="hidden md:table-cell">{payment.paymentMethod}</TableCell>
                <TableCell className="hidden md:table-cell">{payment.date}</TableCell>
                <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
                <TableCell>
                    <Badge variant={payment.status === 'approved' ? 'default' : payment.status === 'rejected' ? 'destructive' : 'secondary'} className="capitalize">{payment.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Approve</DropdownMenuItem>
                        <DropdownMenuItem>Reject</DropdownMenuItem>
                        <DropdownMenuItem>View Proof</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        ))
    }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div>
            <CardTitle>Payments</CardTitle>
            <CardDescription>Manage all customer payments and account activations.</CardDescription>
        </div>
        <div className="ml-auto">
            <Button size="sm" variant="outline" className="h-8 gap-1">
                <FileDown className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                </span>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead className="hidden md:table-cell">Method</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              <TabsContent value="all">{renderTableRows()}</TabsContent>
              <TabsContent value="pending">{renderTableRows('pending')}</TabsContent>
              <TabsContent value="approved">{renderTableRows('approved')}</TabsContent>
              <TabsContent value="rejected">{renderTableRows('rejected')}</TabsContent>
            </TableBody>
          </Table>
        </Tabs>
      </CardContent>
    </Card>
  )
}
