import { SocialConnection } from "@/types/connection.types";
import {
    SiFacebook,
    SiFacebookHex,
    SiGithub,
    SiInstagram,
    SiInstagramHex,
    SiTiktok,
    SiWhatsapp,
    SiWhatsappHex,
    SiX,
    SiYoutube,
    SiYoutubeHex
} from "@icons-pack/react-simple-icons";
import { IconBrandLinkedin } from "@tabler/icons-react";

export const SUPPORTED_SOCIAL_PLATFORMS: SocialConnection[] = [
    {
        id: 'x',
        name: "X",
        icon: SiX,
    },
    {
        id: 'instagram',
        name: "Instagram",
        icon: SiInstagram,
        color: SiInstagramHex,
    },
    {
        id: 'youtube',
        name: "YouTube",
        icon: SiYoutube,
        color: SiYoutubeHex,
    },
    {
        id: 'tiktok',
        name: "TikTok",
        icon: SiTiktok,
    },
    {
        id: 'linkedin',
        name: "LinkedIn",
        icon: IconBrandLinkedin,
    },
    {
        id: 'github',
        name: "GitHub",
        icon: SiGithub,
    },
    {
        id: 'facebook',
        name: "Facebook",
        icon: SiFacebook,
        color: SiFacebookHex,
    },
    {
        id: 'whatsapp',
        name: "WhatsApp",
        icon: SiWhatsapp,
        color: SiWhatsappHex,
    },
];