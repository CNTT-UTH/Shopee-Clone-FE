export const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
}

export const inputVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: any) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.2, duration: 0.4, ease: 'easeOut' },
  }),
}