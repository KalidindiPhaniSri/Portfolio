import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  Grow,
  Box,
  TextField,
  Button,
  Grid,
  Stack,
  useTheme,
  useMediaQuery,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import emailjs from "emailjs-com";
import data from "./data.json";
import {
  SectionHeader,
  SnackBar,
  TextBlock,
  type SnackBarProps,
} from "../../Utils/ReusableComponents";
import { Images } from "../../Utils/Helpers";

interface ContactProps {
  onVisible: () => void;
}

const Contact: React.FC<ContactProps> = ({ onVisible }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const themePalette = createTheme({
    palette: {
      warning: {
        main: "#ff9800", // your custom color,
        contrastText: "#fff",
      },
    },
  });
  const { ref, inView } = useInView(data.intersectionObserver);
  const [snackBarProps, setSnackBarProps] = useState<SnackBarProps>({
    open: false,
    message: "",
    severity: "info",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (inView) onVisible();
  }, [inView, onVisible]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    emailjs
      .send(
        "service_l103cr8", // EmailJS service ID
        "template_s4pfbad", // EmailJS template ID
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        "ni_bQYB83jUxpT0PZ" // EmailJS public key
      )
      .then(() => {
        setSending(false);
        setSnackBarProps({
          open: true,
          severity: "success",
          message: "Message sent successfully!",
        });
        setForm({ name: "", email: "", subject: "", message: "" });
      })
      .catch(() => {
        setSending(false);
        alert("Failed to send message. Please try again.");
      });
  };

  const ContactDetails = () => {
    return (
      <>
        <Box textAlign="center" sx={{ pb: 2, pt: 7.5 }}>
          <img
            src={Images[data.contact.chatIcon] ?? ""}
            alt={data.contact.title[0]}
            height={isMobile ? 50 : 75}
            width={isMobile ? 50 : 75}
          />
        </Box>
        <Stack direction="column" gap={2}>
          <Stack direction="row" gap={1}>
            <MailOutlineIcon fontSize="medium" />
            <TextBlock text={"phanisri.kalidindi@gmail.com"} size="lg" />
          </Stack>
          <Stack direction="row" gap={1}>
            <PlaceOutlinedIcon fontSize="medium" />
            <TextBlock text={"Andhra Pradesh, India"} size="lg" />
          </Stack>
        </Stack>
      </>
    );
  };

  const ContactCard = () => {
    return (
      <Grow in={inView} timeout={1000}>
        <Box sx={{ p: 3 }}>
          <form onSubmit={handleSubmit} className="contact-form">
            <Stack direction="row" gap={2}>
              <TextField
                fullWidth
                margin="dense"
                size="small"
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="text-field"
              />

              <TextField
                fullWidth
                margin="dense"
                size="small"
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="text-field"
              />
            </Stack>
            <TextField
              fullWidth
              margin="dense"
              size="small"
              label="Subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              className="text-field"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Message"
              name="message"
              multiline
              rows={3}
              value={form.message}
              onChange={handleChange}
              required
              className="text-field"
            />
            <Box textAlign="end">
              <Button
                type="submit"
                variant="contained"
                color="warning"
                disabled={sending}
              >
                {sending ? "Submitting..." : "Submit"}
              </Button>
            </Box>
          </form>
        </Box>
      </Grow>
    );
  };

  return (
    <section ref={ref} id="contact" className="contact">
      <ThemeProvider theme={themePalette}>
        <SectionHeader
          startText={data.contact.title[0]}
          endText={data.contact.title[1]}
        />
        <TextBlock text={data.contact.text} size="lg" />
        <Grid container spacing={0} justifyContent="center">
          <Grid size={{ xs: 8, md: 3 }}>
            <ContactDetails />
          </Grid>
          <Grid size={{ xs: 8, md: 6 }}>
            <ContactCard />
          </Grid>
        </Grid>
        <SnackBar
          snackBarProps={snackBarProps}
          setSnackBarProps={setSnackBarProps}
        />
      </ThemeProvider>
    </section>
  );
};

export default Contact;
