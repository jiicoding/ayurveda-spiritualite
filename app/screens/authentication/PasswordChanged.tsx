import React from "react"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import {
  Container,
  Box,
  Text,
  Button,
  RoundIconButton,
  RoundIcon,
} from "../../components/base-components"

const PasswordChanged = observer(function PasswordChanged() {
  const navigation = useNavigation()
  const SIZE = 80

  return (
    <Container
      pattern={0}
      footer={
        <Box flexDirection="row" justifyContent="center">
          <RoundIconButton
            name="x"
            size={60}
            backgroundColor="background"
            color="secondary"
            onPress={() => navigation.navigate("Welcome")}
          />
        </Box>
      }
    >
      <Box alignSelf="center">
        <RoundIcon name="check" size={SIZE} color="primary" backgroundColor="primaryLight" />
      </Box>
      <Text variant="title1" textAlign="center" marginVertical="l">
        Your password was successfully changed
      </Text>
      <Text variant="body" textAlign="center" marginBottom="l">
        Close this window and login again.
      </Text>
      <Box alignItems="center" marginTop="m">
        <Button
          variant="primary"
          label="Login again"
          onPress={() => navigation.navigate("Login")}
        />
      </Box>
    </Container>
  )
})

export default PasswordChanged
