import { NavMainItemProps } from '@/types';
import Home from '@mui/icons-material/Home';
import {SiConvertio} from 'react-icons/si';
import {GiPowerGenerator} from 'react-icons/gi';
import {RiFolderKeyholeFill} from 'react-icons/ri';
import { SvgIcon } from '@mui/material';
import { MdMiscellaneousServices } from "react-icons/md";
import { TbTextScan2 } from "react-icons/tb";

export const navTree: NavMainItemProps[] = [
{
    label: 'Home',
    dropdown: false,
    icon: <Home />,
    path: '/'
},
{
    label: 'Generators',
    dropdown: true,
    icon: <SvgIcon><GiPowerGenerator  /></SvgIcon>,
    path: '/generators',
    links: [
    {
        label: 'File Hash Generator',
        path: '/generators/file-hash-generator',
        disabled: false
    },
    {
        label: 'UUID Generator',
        path: '/generators/uuid-generator',
        disabled: false
    },
    {
        label: 'Password Generator',
        path: '/generators/password-generator',
        disabled: false
    },
    {
        label: 'Lorem Ipsum',
        path: '/generators/lorem-ipsum',
        disabled: true
    },
    {
        label: 'Nanoid Generator',
        path: '/generators/nanoid',
        disabled: false
    },
    {
        label: 'QR Code Generator',
        path: '/generators/qr-code',
        disabled: false
    },
    ]
},
{
    label: 'Converters',
    dropdown: true,
    icon: <SvgIcon><SiConvertio/></SvgIcon>,
    path: '/converters',
    disabled: false,
    links: [
    {
        label: 'JSON - YAML',
        path: '/converters/json-yaml',
        disabled: false
    },
    {
        label: 'Number Base',
        path: '/converters/number-base',
        disabled: false
    },
    {
        label: 'Color Converter',
        path: '/converters/color-converter',
        disabled: false
    },
    {
        label: 'Text Escape/Unescape',
        path: '/converters/text-escape-unescape',
        disabled: false
    }
    ]
},
{
    label: 'Encoders/Decoders',
    dropdown: true,
    icon: <SvgIcon><RiFolderKeyholeFill/></SvgIcon>,
    path: '/encode-decode',
    disabled: false,
    links: [
    {
        label: 'Base64 Encoder/Decoder',
        path: '/encode-decode/base64',
        disabled: false
    },
    {
        label: 'Base64 Image Encoder/Decoder',
        path: '/encode-decode/base64-image',
        disabled: false
    },
    {
        label: 'JWT Encoder/Decoder',
        path: '/encode-decode/jwt',
        disabled: false
    },
    ]
},
{
    label: 'Parsers',
    dropdown: true,
    icon: <SvgIcon><TbTextScan2/></SvgIcon>,
    path: '/parsers',
    disabled: false,
    links: [
    {
        label: 'URL Parser',
        path: '/parsers/url-parser',
        disabled: false
    },
    {
        label: 'Markdown Preview',
        path: '/parsers/markdown-preview',
        disabled: false
    },
    ]
},
{
    label: 'Miscellaneous',
    dropdown: true,
    icon: <SvgIcon><MdMiscellaneousServices/></SvgIcon>,
    path: '/misc',
    disabled: false,
    links: [
    {
        label: 'File Size Conversion',
        path: '/misc/size-conversion',
        disabled: false
    },
    ]
},
]

