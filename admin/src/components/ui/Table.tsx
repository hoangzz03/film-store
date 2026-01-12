// src/components/ui/Table.tsx
interface TableProps {
    children: React.ReactNode;
  }
  
  const Table: React.FC<TableProps> = ({ children }) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {children}
        </table>
      </div>
    );
  };
  
  export default Table;