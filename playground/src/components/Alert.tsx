import { Button, useSweetAlert, SweetAlertProvider } from "@uengage/ui";

function Inner() {
  const { fire } = useSweetAlert();

  const handleClick = async () => {
    const result = await fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
    });
    console.log(result);
    if (result.isConfirmed) {
      await fire({
        title: "Success!",
        icon: "success",
      });
    }
  };

  return <Button onClick={handleClick}>Open Flow</Button>;
}

export default function Demo() {
  return (
    <SweetAlertProvider>
      <Inner />
    </SweetAlertProvider>
  );
}
