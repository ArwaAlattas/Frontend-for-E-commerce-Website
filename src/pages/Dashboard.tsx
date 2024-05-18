import React from "react"

import styles from "../pages/error.module.css"
import PageTitle from "@/components/PageTitle"

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <PageTitle title="Dashboard" />
      <h1 className={styles.text}>Dashboard page</h1>
    </div>
  )
}

export default Dashboard
