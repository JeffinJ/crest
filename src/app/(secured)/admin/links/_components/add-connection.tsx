"use client"

import { ButtonWithGradient } from "@/components/ui/button-with-gradient"
import { IconSocial } from "@tabler/icons-react"
import { Link2 } from "lucide-react"
import { useState } from "react"
import CustomConnectionForm from "./custom-connection-form"
import SocialConnectionForm from "./social-connection-form"

type ConnectionType = "social" | "custom"

export default function AddConnection() {
    const [selectedConnection, setSelectedConnection] = useState<ConnectionType | null>(null)

    return (
        <div className="flex flex-col space-y-5">
            <div className="flex flex-row space-x-5">
                <ButtonWithGradient
                    type="button"
                    onClick={() => { setSelectedConnection('custom') }} className="">
                    <Link2 className="w-6 h-6" />
                    <div>Add custom connection</div>
                </ButtonWithGradient>
                <ButtonWithGradient
                    type="button"
                    onClick={() => { setSelectedConnection('social') }} className="">
                    <IconSocial className="w-6 h-6" />
                    <div>Add custom connection</div>
                </ButtonWithGradient>
            </div>

            {
                selectedConnection && (
                    <>
                        {selectedConnection === 'custom' ?
                            <div>
                                <CustomConnectionForm
                                    onSaved={() => { }}
                                    onCanceled={() => {
                                        setSelectedConnection(null)
                                    }} />
                            </div> :
                            <div>
                                <SocialConnectionForm />
                            </div>
                        }
                    </>
                )
            }
        </div>
    )
}  