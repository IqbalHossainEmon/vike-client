import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";

const Product = ({ product, products, setProducts }) => {
  const { img, name, price, description, _id } = product;
  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");

  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    handleClose();
    axios
      .delete(`https://cryptic-mesa-14109.herokuapp.com/product/${deleteId}`)
      .then((result) => {
        if (result.data.deletedCount) {
          const remainingOrder = products.filter(
            (product) => product._id !== deleteId
          );
          setProducts(remainingOrder);
        }
      });
  };

  const handleOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    borderRadius: "40px",
    bgcolor: "background.paper",
    border: "2px solid rgba(0,0,0,0.5)",
    boxShadow: 24,
    p: 4,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <>
      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              onClick={handleDelete}
              sx={{ mx: 2 }}
              variant="outlined"
              color="error"
            >
              Yes
            </Button>
            <Button
              onClick={handleClose}
              sx={{ mx: 2 }}
              variant="outlined"
              color="success"
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* modal end */}
      <Grid item lg={3} md={6} xs={12}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image={img}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Price: $ {price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => handleOpen(_id)}
              size="small"
              variant="contained"
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default Product;
