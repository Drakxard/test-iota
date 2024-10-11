import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function TransactionList({ transactions }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Transaction Hash</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Message</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((tx, index) => (
          <TableRow key={index}>
            <TableCell>{tx.hash}</TableCell>
            <TableCell>{tx.address}</TableCell>
            <TableCell>{tx.message}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}