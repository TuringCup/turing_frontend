import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {ChangeEvent} from "react";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface UploadFileBtnPops{
    text: string,
    onChange: (e: ChangeEvent<HTMLInputElement>)=>void
}

export default React.forwardRef(function UploadFileBtn({ text, onChange }: UploadFileBtnPops, ref: React.Ref<HTMLInputElement>) {
    return (
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            {text}
            <VisuallyHiddenInput type="file" ref={ref} onChange={onChange}/>
        </Button>
    );
});