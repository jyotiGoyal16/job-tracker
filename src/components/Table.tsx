import type { ReactNode } from 'react'
import Card from './Card'

interface TableProps {
  children: ReactNode
}

function Table({ children }: TableProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">{children}</div>
    </Card>
  )
}

export default Table
