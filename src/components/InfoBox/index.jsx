import { Card, CardContent, Typography } from "@material-ui/core";
import './styles.css'
export default function InfoBox({ title, cases, total }) {
  return (
    <Card className="infoBox">
      <CardContent>
        <Typography className="infoBox__title" variant="caption" color="textSecondary">
          {title}
        </Typography>
        <h2 className="infoBox__cases">{cases} </h2>
        <Typography className="infoBox__total" variant="caption" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}
