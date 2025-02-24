  import { Button, createStyles, makeStyles, Modal, TextField, Theme } from "@material-ui/core"
  import { useEffect, useState } from "react";
  import { SubmitHandler, useForm } from "react-hook-form";
  import { AdType, db } from "../db";

  function getModalStyle() {
      const top = 50
      const left = 50
    
      return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
      };
    }

    const useStyles = makeStyles((theme: Theme) =>
      createStyles({
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
        textField: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          width: 200,
        },
      }),
    );
    
  interface Props {
    open: boolean
    handleClose: () => void
    selectedAd: AdType | null
  }

  export default function AdModal(props: Props ) {
      const [modalStyle] = useState(getModalStyle);
      const classes = useStyles();

      const {
          register,
          handleSubmit,
          reset,
      } = useForm<AdType>()
      const onSubmit: SubmitHandler<AdType> = async (data) => {
        if (!props.selectedAd?.id) {
          try {
            const id = await db.ads.add({
              name: data.name,
              content: data.content,
              startDate: data.startDate,
              endDate: data.endDate
            })
  
              alert("Ad successfully added! Id: " + id);
              reset(); // Clear form
              props.handleClose(); // Close modal
          } catch (error) {
            console.error("Error adding ad:", error);
          }
        } else {
          try {
            await db.ads.put({id: props.selectedAd.id,
              name: data.name,
              content: data.content,
              startDate: data.startDate,
              endDate: data.endDate
            })
  
              alert("Ad successfully edited!");
              reset();
              props.handleClose();
          } catch (error) {
            console.error("Error updating ad:", error);
          }
        }
        
      }

      useEffect(() => {
        reset(props.selectedAd || {});
      }, [props.selectedAd, reset]);

      return (
          <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
            <div style={modalStyle} className={classes.paper}>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <TextField 
                      {...register("name", { required: true })}
                      id="standard-basic"
                      label="Name"
                      defaultValue={props.selectedAd?.name}
                    />
                    <TextField
                      {...register("content")}
                      id="standard-multiline-static"
                      label="Content"
                      multiline
                      inputProps={{ maxLength: 500 }}
                      defaultValue={props.selectedAd?.content}
                    />
                    <TextField
                      {...register("startDate")}
                      id="startDate"
                      label="Start date"
                      type="date"
                      defaultValue={props.selectedAd?.startDate}
                      className={classes.textField}
                      InputLabelProps={{
                      shrink: true,
                      }}
                    />
                    <TextField
                      {...register("endDate")}
                      id="endDate"
                      label="End date"
                      type="date"
                      
                      defaultValue={props.selectedAd?.endDate}
                      className={classes.textField}
                      InputLabelProps={{
                      shrink: true,
                      }}
                    />
                    <Button type="submit" color='primary' variant="contained">Submit</Button>
                </form>
            </div>
        </Modal>
      )
  }