import { Typography, TextField, Button } from "@mui/material";
import { Formik, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

let validationSchema = Yup.object({
  pengajuan_name: Yup.string().required("Pengajuan name must be fill"),
});
export default function ModalAdd(props) {
  let initialValue = {
    pengajuan_name: "",
  };
  let [stateField, setStateField] = useState(initialValue);
  const renderError = (message) => (
    <Typography sx={{ color: "red", fontSize: "12px" }} align="right">
      {message}
    </Typography>
  );
  function getOne() {
    axios({
      method: "get",
      url: `http://localhost:3000/pengajuan/${props.id}`,
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res.data.data, "responses");
        setStateField((prevState) => {
          return {
            ...prevState,
            pengajuan_name: res.data.data.nama_pengajuan,
          };
        });
      })
      .catch((e) => {
        console.log(e, "dari getone");
        Swal.fire({
          icon: "error",
          text: e.response.data.message,
        });
      });
  }
  function prosesSubmit(data) {
    console.log(data, "data");
    let input = {
      nama_pengajuan: data.pengajuan_name,
    };
    axios
      .post("http://localhost:3000/add-pengajuan", input, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        props.setOpen(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "add pengajuan successfully",
          confirmButtonText: "Ok",
          // timer: 1500,
        }).then((result) => {
          console.log(result, "result");
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            props.fetchPengajuan();
          }
        });
      })
      .catch(function (error) {
        console.log(error, "eror");
      });
  }

  function prosesEditSubmit(data) {
    console.log(data, "masuk");
    let input = {
      nama_pengajuan: data.pengajuan_name,
    };
    axios
      .put(`http://localhost:3000/edit-pengajuan/${props.id}`, input, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        props.setOpen(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "edit pengajuan successfully",
          confirmButtonText: "Ok",
          // timer: 1500,
        }).then((result) => {
          console.log(result, "result");
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            props.fetchPengajuan();
          }
        });
      })
      .catch(function (error) {
        console.log(error, "eror");
        Swal.fire({
          icon: "error",
          text: e.response.data.message,
        });
      });
    // router.refresh();
  }

  useEffect(() => {
    if (props.statusForm === "edit") {
      getOne();
    }
  }, []);
  return (
    <div
      style={{
        width: "100%",
        background: "white",
        padding: "0px 0px 20px ",
        borderRadius: "5px",
      }}
    >
      <Formik
        enableReinitialize={props.statusForm === "add" ? false : true}
        initialValues={stateField}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          {
            props.statusForm === "add"
              ? prosesSubmit(values)
              : prosesEditSubmit(values);
          }
        }}
      >
        {(props) => {
          const {
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          } = props;
          console.log(values, "values");
          return (
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "0px 20px 20px 20px",
                }}
              >
                <TextField
                  //   autoFocus
                  margin="dense"
                  id="pengajuan_name"
                  label="pengajuan Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={values.pengajuan_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                {values.pengajuan_name === "" && (
                  <ErrorMessage name="pengajuan_name" render={renderError} />
                )}
              </div>
              <div
                style={{
                  marginRight: "20px ",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button variant="contained" color="success" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
