import { Button, CloseButton, Dialog } from "@chakra-ui/react";

type ErrorDialogProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    errorTitle: string;
    errorDetail: string[];
}

function ErrorDialog({ isOpen, setIsOpen, errorTitle, errorDetail }: ErrorDialogProps) {
    return (
        <Dialog.Root
            placement="top"
            motionPreset="slide-in-bottom"
            open={isOpen}
            onOpenChange={(e) => setIsOpen(e.open)}
        >
            <Dialog.Backdrop />
            <Dialog.Positioner>
            <Dialog.Content>
            <Dialog.Header>
                <Dialog.Title>{errorTitle}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
                <p>
                {errorDetail.map((line, idx) => (
                    <span key={idx}>
                        {line}
                        {idx < errorDetail.length - 1 && <br />}
                    </span>
                ))}
                </p>
            </Dialog.Body>
            <Dialog.Footer>
                <Button
                    className="bg-main"
                    onClick={() => setIsOpen(false)}
                >OK</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
            </Dialog.CloseTrigger>
            </Dialog.Content>
        </Dialog.Positioner>
    </Dialog.Root>
    )
}

export default ErrorDialog;