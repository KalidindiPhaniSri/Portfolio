import React, { useEffect, useState, memo } from "react";
import { useInView } from "react-intersection-observer";
import {
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
  const { ref, inView } = useInView(data.intersectionObserver);
  const themePalette = createTheme({
    palette: {
      warning: {
        main: "#ff9800",
        contrastText: "#fff",
      },
    },
  });

  useEffect(() => {
    if (inView) onVisible();
  }, [inView, onVisible]);

  const ContactForm = memo(() => {
    const [form, setForm] = useState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    const [sending, setSending] = useState(false);
    const [snackBarProps, setSnackBarProps] = useState<SnackBarProps>({
      open: false,
      message: "",
      severity: "info",
    });
    const themePalette = createTheme({
      palette: {
        warning: {
          main: "#ff9800",
          contrastText: "#fff",
        },
      },
    });

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSending(true);

      emailjs
        .send(
          "service_m328tfc", // EmailJS service ID
          "template_s4pfbad", // EmailJS template ID
          {
            name: form.name,
            email: form.email,
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

    return (
      <ThemeProvider theme={themePalette}>
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
        <SnackBar
          snackBarProps={snackBarProps}
          setSnackBarProps={setSnackBarProps}
        />
      </ThemeProvider>
    );
  });

  const ContactDetails = memo(() => {
    return (
      <Stack
        direction="column"
        alignItems="center"
        gap={0}
        sx={{ pb: isMobile ? 2 : 0 }}
      >
        <Box textAlign="center" sx={{ pb: 2, pt: isMobile ? 2 : 7.5 }}>
          <img
            src={Images[data.contact.chatIcon] ?? ""}
            alt={data.contact.title[0]}
            height={isMobile ? 50 : 75}
            width={isMobile ? 50 : 75}
          />
        </Box>
        <Stack direction="column">
          <Stack direction="row" gap={1}>
            <MailOutlineIcon fontSize="medium" />
            <TextBlock text={"phanisri.kalidindi@gmail.com"} size="lg" />
          </Stack>
          <Stack direction="row" gap={1}>
            <PlaceOutlinedIcon fontSize="medium" />
            <TextBlock text={"Andhra Pradesh, India"} size="lg" />
          </Stack>
        </Stack>
      </Stack>
    );
  });

  return (
    <section ref={ref} id="contact" className="contact">
      <ThemeProvider theme={themePalette}>
        <SectionHeader
          startText={data.contact.title[0]}
          endText={data.contact.title[1]}
        />
        <TextBlock text={data.contact.text} size="lg" />
        <Grid
          container
          spacing={0}
          justifyContent="center"
          gap={!isMobile ? 6 : 0}
        >
          <Grid size={{ xs: 12, md: 2.5 }}>
            <ContactDetails />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ContactForm />
          </Grid>
        </Grid>
      </ThemeProvider>
    </section>
  );
};

export default Contact;
