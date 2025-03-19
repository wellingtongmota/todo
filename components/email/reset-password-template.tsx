import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text
} from "@react-email/components"
import { buttonVariants } from "../ui/button"

export function ResetPasswordTemplate({ url }: { url: string }) {
  return (
    <Html>
      <Head />
      <Preview>Reset Your Password</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section>
            {/* Header */}
            <Heading style={headerStyle}>todoNookdev</Heading>
            <Text style={subHeaderStyle}>A simple todo app</Text>
          </Section>

          <Section style={mainSectionStyle}>
            <Heading as="h2" style={titleStyle}>
              Reset Your Password
            </Heading>

            <Text style={paragraphStyle}>
              We received a request to reset your password. Click the link below
              to choose a new password:
            </Text>

            <a href={url} className={buttonVariants({ variant: "link" })}>
              Reset Password
            </a>

            <Text style={smallTextStyle}>
              {`If the button above doesn't work, copy and paste this URL into
              your web browser:`}
            </Text>

            <Text style={linkContainerStyle}>
              <Link href={url} style={linkStyle}>
                {url}
              </Link>
            </Text>
          </Section>

          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              © {new Date().getFullYear()} todoNookdev. All rights reserved.
            </Text>
            <Text style={footerTextStyle}>
              This is an automated email. Please do not reply to this message.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const bodyStyle = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  margin: 0,
  padding: 0
}

const containerStyle = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px 0"
}

const headerStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  padding: "20px 0 0 0",
  margin: 0,
  color: "#333"
}

const subHeaderStyle = {
  fontSize: "16px",
  textAlign: "center" as const,
  color: "#666",
  margin: "4px 0 20px 0"
}

const mainSectionStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  padding: "40px 30px",
  margin: "0 20px"
}

const titleStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#333",
  margin: "0 0 24px 0",
  textAlign: "center" as const
}

const paragraphStyle = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#4c4c4c",
  margin: "16px 0"
}

const smallTextStyle = {
  fontSize: "14px",
  color: "#6b7280",
  margin: "16px 0 8px 0"
}

const linkContainerStyle = {
  textAlign: "center" as const,
  margin: "0 0 16px 0",
  wordBreak: "break-all" as const
}

const linkStyle = {
  color: "#4F46E5",
  fontSize: "14px",
  textDecoration: "underline"
}

const footerStyle = {
  textAlign: "center" as const,
  padding: "20px 0"
}

const footerTextStyle = {
  fontSize: "12px",
  color: "#6b7280",
  margin: "4px 0"
}
