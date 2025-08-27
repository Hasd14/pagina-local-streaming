import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { accountInventory } from "@/lib/data"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AddAccountDialog } from "@/components/admin/AddAccountDialog"

export default function InventoryPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div>
            <CardTitle>Account Inventory</CardTitle>
            <CardDescription>
            Manage your master accounts and track available profiles.
            </CardDescription>
        </div>
        <div className="ml-auto">
            <AddAccountDialog />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Master Email</TableHead>
              <TableHead className="hidden md:table-cell">Usage</TableHead>
              <TableHead className="text-right">Available</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accountInventory.map(item => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.serviceName}</TableCell>
                <TableCell>{item.masterEmail}</TableCell>
                <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                        <Progress value={(item.assignedProfiles / item.totalProfiles) * 100} className="w-32" />
                        <span>{item.assignedProfiles} / {item.totalProfiles}</span>
                    </div>
                </TableCell>
                <TableCell className="text-right font-bold text-lg">{item.availableProfiles}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
       <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-4</strong> of <strong>4</strong> products
        </div>
      </CardFooter>
    </Card>
  )
}
