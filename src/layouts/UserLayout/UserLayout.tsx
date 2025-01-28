interface Props {
  children?: React.ReactNode
}

export default function UserLayout({ children }: Props) {
  return (
    <div>
      {children}
    </div>
  )
}
