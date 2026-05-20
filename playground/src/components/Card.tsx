import {
  Card,

  CardHeader,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  Grid,
} from "@uengage/ui";
export default function CardPreview() {
  return (
    <>
      <Grid strip columns="6" limit={6}>
        <Card>
          <CardHeader>This is a demo card header</CardHeader>
        </Card>
         <Card>
          <CardHeader>This is a demo card header</CardHeader>
        </Card>
         <Card>
          <CardHeader>This is a demo card header</CardHeader>
        </Card>
         <Card>
          <CardHeader>This is a demo card header</CardHeader>
        </Card>
        <Card>
          <CardHeader>This is a demo card header</CardHeader>
        </Card>
         <Card>
          <CardHeader>This is a demo card header</CardHeader>
        </Card>
      </Grid>
      
    </>
  );
}
