import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

// Props for Table
interface TableProps {
  children: ReactNode; // Table content (thead, tbody, etc.)
  className?: string; // Optional className for styling
}

// Props for TableHeader
interface TableHeaderProps {
  children: ReactNode; // Header row(s)
  className?: string; // Optional className for styling
}

// Props for TableBody
interface TableBodyProps {
  children: ReactNode; // Body row(s)
  className?: string; // Optional className for styling
}

// Props for TableRow
interface TableRowProps {
  children: ReactNode; // Cells (th or td)
  className?: string; // Optional className for styling
}

// Props for TableCell
interface TableCellProps {
  children: ReactNode; // Cell content
  isHeader?: boolean; // If true, renders as <th>, otherwise <td>
  className?: string; // Optional className for styling
  colSpan?: number; // Optional column span
}

// Table Component
const Table: React.FC<TableProps> = ({ children, className }) => {
  return <table className={twMerge("min-w-full", className)}>{children}</table>;
};

// TableHeader Component
// Every table needs a line under its header row to separate it from
// the body — most call sites forgot to add this themselves, so it's
// a default here rather than something 20+ files each have to set.
const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => {
  return (
    <thead
      className={twMerge(
        "border-b border-gray-100 dark:border-white/[0.05]",
        className
      )}
    >
      {children}
    </thead>
  );
};

// TableBody Component
const TableBody: React.FC<TableBodyProps> = ({ children, className }) => {
  return <tbody className={className}>{children}</tbody>;
};

// TableRow Component
// A line under every row by default — without it, rows with
// multi-line cells (e.g. a name + email stacked in one cell) visually
// run together. Using a literal border-b here rather than `divide-y`
// on TableBody, since divide-y's CSS-variable-based border calc isn't
// resolving to a nonzero width in this project's Tailwind setup.
const TableRow: React.FC<TableRowProps> = ({ children, className }) => {
  return (
    <tr
      className={twMerge(
        "border-b border-gray-100 last:border-b-0 dark:border-white/[0.05]",
        className
      )}
    >
      {children}
    </tr>
  );
};

// TableCell Component
const TableCell: React.FC<TableCellProps> = ({
  children,
  isHeader = false,
  className,
  colSpan,
}) => {
  const CellTag = isHeader ? "th" : "td";

  const baseClasses = isHeader
    ? "px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400"
    : "px-5 py-4 align-middle text-sm text-gray-700 dark:text-gray-300";

  return (
    <CellTag className={twMerge(baseClasses, className)} colSpan={colSpan}>
      {children}
    </CellTag>
  );
};

export { Table, TableHeader, TableBody, TableRow, TableCell };
