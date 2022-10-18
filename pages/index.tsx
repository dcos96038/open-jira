import type {NextPage} from "next";

import {Card, CardHeader, Grid} from "@mui/material";

import Layout from "../components/layouts/Layout";
import EntryList from "../components/ui/EntryList";
import NewEntry from "../components/ui/NewEntry";

const Home: NextPage = () => {
  return (
    <Layout title="Home - Open Jira">
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          <Card sx={{height: "calc(100vh - 100px)"}}>
            <CardHeader title="Pendientes" />

            <NewEntry />

            <EntryList status="pending" />
          </Card>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Card sx={{height: "calc(100vh - 100px)"}}>
            <CardHeader title="En curso" />

            <EntryList status="in-progress" />
          </Card>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Card sx={{height: "calc(100vh - 100px)"}}>
            <CardHeader title="Finalizado" />

            <EntryList status="finished" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
