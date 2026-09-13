import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  MoreHorizontal,
  Search,
  User,
  Shield,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { apiClient } from "../../services/api/client";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function Users() {
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiClient.get(
          `https://api.vivahamatri.com/api/profiles/admin?page=${currentPage}&limit=10`,
        );
        console.log("Response data", res.data);
        // The profiles array is inside res.data.data
        if (res.data && res.data.data) {
          setUserData(res.data.data);
        }
        if (res.data && res.data.pagination) {
          setTotalPages(res.data.pagination.totalPages);
          setTotalUsers(res.data.pagination.total);
        }
      } catch (error) {
        console.error("Failed to fetch profiles:", error);
      }
    };
    fetchUsers();
  }, [currentPage]);

  const filteredUsers = userData.filter(
    (profile: any) =>
      profile.personal?.name?.toLowerCase().includes(search.toLowerCase()) ||
      profile.contact?.email?.toLowerCase().includes(search.toLowerCase()) ||
      profile.matrimonyId?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">
            Manage your platform's users and their roles.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search users..."
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent>
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th className="h-10 px-4 align-middle font-medium">Name</th>
                    <th className="h-10 px-4 align-middle font-medium">
                      Email
                    </th>
                    <th className="h-10 px-4 align-middle font-medium">Role</th>
                    <th className="h-10 px-4 align-middle font-medium">
                      Status
                    </th>
                    <th className="h-10 px-4 align-middle font-medium">
                      Joined
                    </th>
                    <th className="h-10 px-4 align-middle font-medium text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-8 text-center text-muted-foreground"
                      >
                        No users found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((profile: any) => {
                      const name = profile.personal?.name || "Unknown";
                      const email = profile.contact?.email || "N/A";
                      const role = profile.userId?.role || "User";
                      const status =
                        profile.status === "ACTIVE"
                          ? "Active"
                          : profile.status === "PENDING"
                            ? "Pending"
                            : "Inactive";

                      return (
                        <tr
                          key={profile._id}
                          className="transition-colors hover:bg-muted/50"
                        >
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 overflow-hidden items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                                {profile.primaryPhoto ? (
                                  <img
                                    src={profile.primaryPhoto}
                                    alt={name}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <User className="h-4 w-4" />
                                )}
                              </div>
                              <span className="font-medium">{name}</span>
                            </div>
                          </td>
                          <td className="p-4 align-middle text-muted-foreground">
                            {email}
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-1.5">
                              {role === "admin" || role === "ADMIN" ? (
                                <Shield className="h-3.5 w-3.5 text-blue-500" />
                              ) : null}
                              <span className="capitalize">
                                {role.toLowerCase()}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div
                              className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium
                              ${status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : ""}
                              ${status === "Pending" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" : ""}
                              ${status === "Inactive" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : ""}
                            `}
                            >
                              {status === "Active" && (
                                <CheckCircle className="h-3 w-3" />
                              )}
                              {status === "Inactive" && (
                                <XCircle className="h-3 w-3" />
                              )}
                              {status}
                            </div>
                          </td>
                          <td className="p-4 align-middle text-muted-foreground">
                            {new Date(profile.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4 align-middle text-right">
                            <button
                              onClick={() => setSelectedUser(profile)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{userData.length}</span> of{" "}
              <span className="font-medium">{totalUsers}</span> users
            </p>
            <div className="flex items-center space-x-2">
              <button
                className="inline-flex items-center justify-center rounded-md border p-2 hover:bg-muted disabled:opacity-50"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                className="inline-flex items-center justify-center rounded-md border p-2 hover:bg-muted disabled:opacity-50"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage >= totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-6 py-4">
              <h3 className="text-xl font-semibold">Profile Details</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="rounded-full p-2 hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Header Info */}
              <div className="flex items-center gap-4 border-b pb-4">
                <div className="flex h-80 w-80 overflow-hidden items-center justify-center rounded-md bg-primary/10 text-primary shrink-0">
                  {selectedUser.primaryPhoto ? (
                    <img
                      src={selectedUser.primaryPhoto}
                      alt={selectedUser.personal?.name}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <User className="h-8 w-8" />
                  )}
                </div>
                <div>
                  <h4 className="text-2xl font-bold">
                    {selectedUser.personal?.name || "Unknown"}
                  </h4>
                  <p className="text-muted-foreground">
                    {selectedUser.matrimonyId}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Section */}
                <div className="space-y-2">
                  <h5 className="font-semibold text-primary">
                    Personal Information
                  </h5>
                  <div className="text-sm space-y-1">
                    <p>
                      <span className="text-muted-foreground">Gender:</span>{" "}
                      {selectedUser.personal?.gender}
                    </p>
                    <p>
                      <span className="text-muted-foreground">DOB:</span>{" "}
                      {selectedUser.personal?.dob
                        ? new Date(
                            selectedUser.personal.dob,
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Height:</span>{" "}
                      {selectedUser.personal?.heightCm} cm
                    </p>
                    <p>
                      <span className="text-muted-foreground">Religion:</span>{" "}
                      {selectedUser.personal?.religion}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Caste:</span>{" "}
                      {selectedUser.personal?.caste}
                    </p>
                    <p>
                      <span className="text-muted-foreground">
                        Mother Tongue:
                      </span>{" "}
                      {selectedUser.personal?.motherTongue}
                    </p>
                  </div>
                </div>

                {/* Professional Section */}
                <div className="space-y-2">
                  <h5 className="font-semibold text-primary">
                    Education & Career
                  </h5>
                  <div className="text-sm space-y-1">
                    <p>
                      <span className="text-muted-foreground">Education:</span>{" "}
                      {selectedUser.education?.higherEducation}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Job Type:</span>{" "}
                      {selectedUser.professional?.jobType}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Occupation:</span>{" "}
                      {selectedUser.professional?.occupation}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Income:</span>{" "}
                      {selectedUser.professional?.annualIncome}
                    </p>
                  </div>
                </div>

                {/* Location Section */}
                <div className="space-y-2">
                  <h5 className="font-semibold text-primary">Location</h5>
                  <div className="text-sm space-y-1">
                    <p>
                      <span className="text-muted-foreground">City:</span>{" "}
                      {selectedUser.personal?.location?.city}
                    </p>
                    <p>
                      <span className="text-muted-foreground">State:</span>{" "}
                      {selectedUser.personal?.location?.state}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Country:</span>{" "}
                      {selectedUser.personal?.location?.country}
                    </p>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="space-y-2">
                  <h5 className="font-semibold text-primary">
                    Contact Details
                  </h5>
                  <div className="text-sm space-y-1">
                    <p>
                      <span className="text-muted-foreground">Phone:</span>{" "}
                      {selectedUser.contact?.phone}
                    </p>
                    <p>
                      <span className="text-muted-foreground">WhatsApp:</span>{" "}
                      {selectedUser.contact?.whatsappNumber}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Email:</span>{" "}
                      {selectedUser.contact?.email || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Expectations Section */}
              <div className="space-y-2 border-t pt-4">
                <h5 className="font-semibold text-primary">
                  Partner Expectations
                </h5>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="text-muted-foreground">Age Range:</span>{" "}
                    {selectedUser.expectations?.ageFrom || 18} to{" "}
                    {selectedUser.expectations?.ageTo || 50}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Intercaste:</span>{" "}
                    {selectedUser.expectations?.isIntercaste ? "Yes" : "No"}
                  </p>
                  {selectedUser.expectations?.description && (
                    <p className="mt-2">
                      <span className="text-muted-foreground">
                        Description:
                      </span>{" "}
                      {selectedUser.expectations.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
