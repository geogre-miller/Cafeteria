import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { Trash2, PencilLine, PlusCircle, Coffee, Search } from "lucide-react";
import getPlaces from "../../api";

// Place interface matching our backend model
interface Place {
  _id: string;
  name: string;
  address: string;
  category: string;
  image?: string;
  likes?: number;
  dislikes?: number;
  time?: string;
  description?: string;
}

const initialFormState: Omit<Place, "_id"> = {
  name: "",
  address: "",
  category: "Cafe study",
  image: "",
  likes: 0,
  dislikes: 0,
  time: "",
  description: "",
};

const Admin = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] =
    useState<Omit<Place, "_id">>(initialFormState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      const data = await getPlaces();
      setPlaces(data);
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      category: value,
    });
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setEditingId(null);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (place: Place) => {
    setFormData({
      name: place.name,
      address: place.address,
      category: place.category,
      image: place.image || "",
      likes: place.likes || 0,
      dislikes: place.dislikes || 0,
      time: place.time || "",
      description: place.description || "",
    });
    setEditingId(place._id);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let response;

      if (editingId) {
        // Update existing place
        response = await fetch(`http://localhost:5000/places/${editingId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Create new place
        response = await fetch("http://localhost:5000/places", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Refresh the places list
      fetchPlaces();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving place:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this place?")) {
      try {
        const response = await fetch(`http://localhost:5000/places/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Remove the place from the state
        setPlaces(places.filter((place) => place._id !== id));
      } catch (error) {
        console.error("Error deleting place:", error);
      }
    }
  };

  const filteredPlaces = places.filter(
    (place) =>
      place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={openAddDialog}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Place
        </Button>
      </div>

      <Tabs defaultValue="places" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="places">Places</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="places">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Coffee className="mr-2" />
                Places Management
              </CardTitle>
              <CardDescription>
                Manage all your coffee shop locations from one place.
              </CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search places..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <p className="text-lg">Loading places...</p>
                </div>
              ) : (
                <Table>
                  <TableCaption>A list of your coffee shops.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-center">Stats</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPlaces.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          No places found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPlaces.map((place) => (
                        <TableRow key={place._id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {place.image ? (
                                <img
                                  src={place.image}
                                  alt={place.name}
                                  className="w-8 h-8 rounded-md object-cover"
                                />
                              ) : (
                                <Coffee className="w-8 h-8" />
                              )}
                              {place.name}
                            </div>
                          </TableCell>
                          <TableCell>{place.address}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="border-orange-400 text-orange-400"
                            >
                              {place.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center gap-2">
                              <span title="Likes">❤️ {place.likes || 0}</span>
                              <span title="Dislikes">
                                👎 {place.dislikes || 0}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditDialog(place)}
                              >
                                <PencilLine className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(place._id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                View performance metrics for your coffee shops.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Places
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{places.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Likes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {places.reduce(
                        (sum, place) => sum + (place.likes || 0),
                        0
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Most Popular Category
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {places.length > 0
                        ? Object.entries(
                            places.reduce((acc, place) => {
                              acc[place.category] =
                                (acc[place.category] || 0) + 1;
                              return acc;
                            }, {} as Record<string, number>)
                          ).sort((a, b) => b[1] - a[1])[0][0]
                        : "N/A"}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit" : "Add"} Coffee Shop</DialogTitle>
            <DialogDescription>
              {editingId ? "Update the details" : "Add a new coffee shop"} to
              your collection.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cafe study">Cafe study</SelectItem>
                    <SelectItem value="Cafe indie">Cafe indie</SelectItem>
                    <SelectItem value="Cafe take away">
                      Cafe take away
                    </SelectItem>
                    <SelectItem value="Cafe & food">Cafe & food</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Hours
                </Label>
                <Input
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="e.g. 7:00 - 22:00"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingId ? "Update" : "Add"} Place
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
