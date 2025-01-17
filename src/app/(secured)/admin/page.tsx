import { DashboardChart } from "./_components/dashboard-chart";
import { TrendingChart } from "./_components/radial-chart";
import { TotalViewsChart } from "./_components/total-views";
import WelcomeCard from "./_components/welcome-card";

export default function AdminDashboard() {
    return (
        <div className="flex flex-col space-y-5 p-10 w-[900px] overflow-y-auto">
            <div className="relative flex flex-col gap-y-5 w-full">
                <div className="relative flex flex-col space-y-2">
                    <WelcomeCard />
                </div>

                <div className="flex flex-row space-x-5">
                    <div className="w-full flex flex-col space-y-2">
                        <div className="px-2 py-1 text-xs text-orange-500 ring-1 ring-red-600 w-fit rounded-sm">Sample data</div>
                        <TotalViewsChart />
                    </div>

                    <div className="w-full flex flex-col space-y-2">
                        <div className="px-2 py-1 text-xs text-orange-500 ring-1 ring-red-600 w-fit rounded-sm">Sample data</div>
                        <TrendingChart />
                    </div>
                </div>

                <div className="w-full flex flex-col space-y-2">
                    <div className="px-2 py-1 text-xs text-orange-500 ring-1 ring-red-600 w-fit rounded-sm">Sample data</div>
                    <DashboardChart />
                </div>

            </div>
        </div>
    )
}