import ClubIntroPages from "@/app/(header)/my-club/ClubIntroPage";
import ClubManagePages from "@/app/(header)/my-club/manage/page";
import ClubMemberPages from "@/app/(header)/my-club/member/page";
import ClubSchedulePages from "@/app/(header)/my-club/schedule/page";
import { TabsContent } from "@/components/ui/Tabs";
import ClubLayout from "@/layouts/ClubLayout";
import React from "react";

function MyClubPage() {
  return (
    <>
      <TabsContent value="intro">
        <ClubIntroPages />
      </TabsContent>
      <TabsContent value="schedule">
        <ClubSchedulePages />
      </TabsContent>
      <TabsContent value="member">
        <ClubMemberPages />
      </TabsContent>
      <TabsContent value="manage">
        <ClubManagePages />
      </TabsContent>
    </>
  );
}

export default MyClubPage;
