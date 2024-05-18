import React from "react"

import styles from "../pages/error.module.css"
import PageTitle from "@/components/PageTitle"

const Error = () => {
  return (
    <div className={styles.container}>
      <PageTitle title="Error" />
      <h1 className={styles.text}>404</h1>
      <h2>Page NOT Found</h2>
    </div>
  )
}

export default Error
