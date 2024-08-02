terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.113"
    }
  }
}

provider "azurerm" {
  features {}
}

// FRONTEND SERVER
resource "azurerm_resource_group" "rgfs" {
  name     = "RG-FS"
  location = "North Europe"
}

resource "azurerm_service_plan" "aspfs" {
  name                = "ASP-FS"
  resource_group_name = azurerm_resource_group.rgfs.name
  location            = azurerm_resource_group.rgfs.location
  os_type             = "Windows"
  sku_name            = "B1"
}

resource "azurerm_windows_web_app" "awwafs" {
  name                = "gymfitbulgaria"
  resource_group_name = azurerm_resource_group.rgfs.name
  location            = azurerm_service_plan.aspfs.location
  service_plan_id     = azurerm_service_plan.aspfs.id

  site_config {
    application_stack {
      current_stack = "node"
      node_version  = "~20"
    }
    always_on = false
  }
}